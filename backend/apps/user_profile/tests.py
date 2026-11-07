import tempfile

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.db import transaction
from django.test import TransactionTestCase, override_settings

from apps.user_profile.models import UserProfile


class UserProfileImageLifecycleTests(TransactionTestCase):
    def setUp(self):
        super().setUp()
        media_directory = tempfile.TemporaryDirectory()
        self.addCleanup(media_directory.cleanup)
        settings_override = override_settings(MEDIA_ROOT=media_directory.name)
        settings_override.enable()
        self.addCleanup(settings_override.disable)

    def create_profile_with_image(self):
        user = get_user_model().objects.create_user(username="profile-owner")
        profile = UserProfile.objects.create(user=user)
        profile.image.save("old.jpg", ContentFile(b"old image"), save=True)
        return profile

    def test_replacing_image_removes_old_file(self):
        profile = self.create_profile_with_image()
        storage = profile.image.storage
        old_image_name = profile.image.name
        self.assertTrue(storage.exists(old_image_name))

        profile.image.save("new.jpg", ContentFile(b"new image"), save=True)

        self.assertNotEqual(profile.image.name, old_image_name)
        self.assertFalse(storage.exists(old_image_name))
        self.assertTrue(storage.exists(profile.image.name))

    def test_clearing_image_removes_file_and_database_value(self):
        profile = self.create_profile_with_image()
        storage = profile.image.storage
        old_image_name = profile.image.name

        profile.image = None  # pyright: ignore[reportAttributeAccessIssue]
        profile.save(update_fields=("image",))

        profile.refresh_from_db()
        self.assertFalse(profile.image)
        self.assertFalse(storage.exists(old_image_name))

    def test_rollback_keeps_previous_image(self):
        profile = self.create_profile_with_image()
        storage = profile.image.storage
        old_image_name = profile.image.name

        with self.assertRaises(RuntimeError):
            with transaction.atomic():
                profile.image.save("new.jpg", ContentFile(b"new image"), save=True)
                raise RuntimeError("roll back image update")

        profile.refresh_from_db()
        self.assertEqual(profile.image.name, old_image_name)
        self.assertTrue(storage.exists(old_image_name))

    def test_deleting_profile_removes_file(self):
        profile = self.create_profile_with_image()
        storage = profile.image.storage
        image_name = profile.image.name

        profile.delete()

        self.assertFalse(UserProfile.objects.filter(pk=profile.pk).exists())
        self.assertFalse(storage.exists(image_name))
