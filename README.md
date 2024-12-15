# Manual de Instalación de Smart Library Backend

## Prerequisitos:

- Node.JS
- XAMPP o Similar en Local con MySQL y Apache

## Instalación:

- Clonar el repositorio de ambos proyectos usando Git

```shell
cd smartlibrary/backend
```

```shell
npm install
```

- Crear un archivo '.env' y dentro de este archivo tendrá esté contenido:

```env
API_PASSWORD="TheLibrarian@2024"
API_USERNAME="TheLibrarian"
DATABASE_HOST="localhost"
DATABASE_NAME="alexandria"
DATABASE_PASSWORD="SmartLibrary@2024"
DATABASE_USER="smartLibraryAdmin"
PORT="8080"
SECRET_KEY="Luxor@2024"
WEBSITE_URL="http://localhost:5173"
IS_PROD=false
```

- Crear las tablas correspondientes

```sql
CREATE TABLE`books`(
`id`bigint(20) NOT NULL,
`isbn`bigint(13) NOT NULL,
`title`varchar(255) NOT NULL,
`author_name`varchar(100) NOT NULL,
`publisher_name`varchar(50) NOT NULL,
`num_pages`int(4) NOT NULL,
`img_url`varchar(255) NOT NULL,
`date_published` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

ALTER TABLE `books`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `isbn_index` (`isbn`);

ALTER TABLE `books`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
```

```sql
CREATE TABLE `reviews` (
`id` bigint(100) NOT NULL,
`title` varchar(255) NOT NULL,
`author_name` varchar(40) NOT NULL,
`content` text NOT NULL,
`book_id` bigint(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

ALTER TABLE `reviews`
ADD PRIMARY KEY (`id`),
ADD KEY `book_id_FK` (`book_id`);

ALTER TABLE `reviews`
MODIFY `id` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

ALTER TABLE `reviews`
ADD CONSTRAINT `book_id_FK` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
```

- Insertar los datos correspondientes usando sql ambas tablas(books y reviews)

```sql
INSERT INTO `books` (`id`, `isbn`, `title`, `author_name`, `publisher_name`, `num_pages`, `img_url`, `date_published`) VALUES
(1, 9788408294290, 'Alas de Sangre ED. Limitada', 'Rebecca Yarros', 'Editorial Planeta', 760, 'https://imagessl0.casadellibro.com/a/l/s7/90/9788408294290.webp', '2024-11-13'),
(2, 9788419848741, 'Etéreo Ed. Limitada', 'Joana Marcús', 'Montena', 544, 'https://imagessl0.casadellibro.com/a/l/s7/41/9788419848741.webp', '2024-10-24'),
(3, 9788408294306, 'Alas de Hierro Ed. Limitada', 'Rebecca Yarros', 'Editorial Planeta', 896, 'https://imagessl0.casadellibro.com/a/l/s7/06/9788408294306.webp', '2024-11-13'),
(4, 9788419654892, 'BLACKWATER I. LA RIADA', 'Michael McDowell', ' Blackie Books', 272, 'https://imagessl0.casadellibro.com/a/l/s7/92/9788419654892.webp', '2024-02-07'),
(5, 9788419654915, 'BLACKWATER II. EL DIQUE', 'Michael McDowell', ' Blackie Books', 272, 'https://imagessl0.casadellibro.com/a/l/s7/15/9788419654915.webp', '2024-02-21'),
(6, 9788419654939, 'BLACKWATER III. LA CASA', 'Michael McDowell', 'Blackie Books', 272, 'https://imagessl0.casadellibro.com/a/l/s7/39/9788419654939.webp', '2024-03-06'),
(7, 9788419654953, 'BLACKWATER IV. LA GUERRA', 'Michael McDowell', ' Blackie Books', 272, 'https://imagessl0.casadellibro.com/a/l/s7/53/9788419654953.webp', '2024-03-20'),
(8, 9788419654977, 'BLACKWATER V. LA FORTUNA', 'Michael McDowell', ' Blackie Books', 272, 'https://imagessl0.casadellibro.com/a/l/s7/77/9788419654977.webp', '2024-04-03'),
(9, 9788419654991, 'BLACKWATER VI. LLUVIA', 'Michael McDowell\r\n', ' Blackie Books', 272, 'https://imagessl0.casadellibro.com/a/l/s7/91/9788419654991.webp', '2024-04-17'),
(10, 9788408297079, 'ALAS DE ÓNIX (EMPÍREO 3)', 'Rebecca Yarros', 'Editorial Planeta', 896, 'https://imagessl0.casadellibro.com/a/l/s7/79/9788408297079.webp', '2025-01-22'),
```

```sql
INSERT INTO `reviews` (`id`, `title`, `author_name`, `content`, `book_id`) VALUES
(1, '2.4 de 5', 'David', 'Mucha historia y poco diálogo...', 3),
(2, '5 estrellas de 5', 'Laura Trigos', 'Apasionante historia, me ha hecho llorar desde la primera página.', 3);
```

```shell
npm run backend
```

# Manual de Instalación de Smart Library Frontend

## Prerequisitos:

- Node.JS
- ReactJS
- Vite

# Instalación:

- Clonar el repositorio de ambos proyectos usando Git

  ```shell
  cd smartlibrary/frontend
  ```

  ```shell
  npm install
  ```

- Crear un archivo '.env' y dentro de este archivo tendrá esté contenido:

  ```env
  VITE_API_BASE_URL=http://localhost:8080
  VITE_API_USERNAME=TheLibrarian
  VITE_API_PASSWORD=TheLibrarian@2024
  ```

## Y Listo!!!


### Extra no requerido
- CRUD completo de modelos


### Problemas encontrados:
- La securización de las peticiones la he hecho pensando sin una pantalla de inicio de sesión, solo de manera que las peticiones estén protegidas ante orígenes desconocidos.
- La búsqueda en un principio la hice basándome en el localStorage, pero luego la hice usando peticiones contra la BBDD. Así se podrá buscar todos los libros que existan, ya estén en el localStorage o esten en la BBDD y no estén todavía guardados en el localStorage.