# Generated by Django 4.2.7 on 2023-11-20 20:26

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0002_customuser_follows"),
    ]

    operations = [
        migrations.RenameField(
            model_name="customuser",
            old_name="follows",
            new_name="followers",
        ),
    ]