# Generated by Django 4.1.3 on 2022-11-24 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('zelenyBazar', '0003_rename_tradetypechoices_listing_tradetypechoices_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='listin',
            new_name='listing',
        ),
    ]
