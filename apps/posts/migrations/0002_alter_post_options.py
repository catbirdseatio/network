# Generated by Django 4.2.7 on 2023-11-16 00:44

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("posts", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="post",
            options={"ordering": ["-created_at"]},
        ),
    ]