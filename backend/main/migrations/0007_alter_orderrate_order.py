# Generated by Django 3.2.5 on 2021-09-25 19:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_auto_20210925_1943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderrate',
            name='order',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='order_rates', to='main.order'),
            preserve_default=False,
        ),
    ]
