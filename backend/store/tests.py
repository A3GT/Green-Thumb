from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse


class RegistrationFlowTests(TestCase):
    def test_register_collects_names_and_saves_them(self):
        response = self.client.post(
            reverse('register'),
            {
                'first_name': 'Abc',
                'last_name': 'Gardener',
                'username': 'abcgardener',
                'password1': 'GardenPass123!',
                'password2': 'GardenPass123!',
            },
        )

        self.assertRedirects(response, f"{reverse('login')}?next=%2F")

        user = User.objects.get(username='abcgardener')
        self.assertEqual(user.first_name, 'Abc')
        self.assertEqual(user.last_name, 'Gardener')