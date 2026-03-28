FROM php:8.4-cli

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-mysql-client \
        git \
        unzip \
        zip \
    && docker-php-ext-install pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

RUN chmod +x docker/start-container.sh

EXPOSE 8000

CMD ["sh", "docker/start-container.sh"]
