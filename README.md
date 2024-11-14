# Clinica Sabarino

Este proyecto fue hecho [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.2, sudor y lagrimas (ademas de lo ultimo que me quedaba de amor por el estudio).

## Ejecutarlo como Localhost

Usar el comando `ng serve -o` para correr el servidor de manera local. Abrira automaticamente la direccion `http://localhost:4200/home`. La aplicación recarga automaticamente si un cambio fue hecho en el codigo, tener cuidado en los modulos que carguen dactos desde un servidor externo, puede que tengas que navegar a otra pestaña o esperar.

## Nuevos Modulos

Correr `ng generate component component-folder/component-name` para generar un nuevo componente. Se pueden usar tambien: `ng generate directive|pipe|service|class|guard|interface|enum|module`.

# Paginas

## Pagina de Inicio
Posee 3 slides
* Inicio
* Iniciar Sesión
* Registro: Dividida entre usuarios o especialistas. Tener en cuenta que se debe activar la cuenta por un administrador antes de poder iniciar sesión.
![image](https://github.com/user-attachments/assets/01827faa-3a47-4b58-a453-11619a2a939b)

### Anotaciones: Registro Especialistas
Dentro del registro de especialistas podremos agregar nuevas especialidades a la lista. Se debe escribir en el recuadro de texto debajo de especialistas y apretar enter. El codigo es case-sensitive, lo cual clinico y Clinico seran tomados como especialidades diferentes.
![image](https://github.com/user-attachments/assets/e619f5f3-8748-4eae-a9d5-d235c079b098)

### Anotaciones: Inicio de Sesión
Dentro del inicio de sesión hay botones de acceso rapido para pruebas. Se recomienda sacarlos una vez completado el desarrollo.
![image](https://github.com/user-attachments/assets/962efd12-8426-4b42-8e47-8ef554f5dd8c)

## Paciente
El paciente deberia poder ver:
* Sacar Turno
* Mis Turnos
* Perfil

### Sacar Turno
Empezando por seleccionar la especialidad, el programa posteriormente muestra los medicos disponibles para dicha especialidad y finalmente los turnos disponibles para dicho doctor. En un futuro se evalua la posibilidad de abrir lus turnos que fueron cancelados para volver a agregarlos como poosibilidad. Solo permite ver turnos una semana a futuro, no incluye al dia en curso (por razones obvias). No permite sobreturnos.
![image](https://github.com/user-attachments/assets/ebdab788-c201-4a2d-9b6e-f60cd25d6fce)

### Perfil
Solo tiene nuestros datos y una recomendación aleatoria para mejorar nuestro bienestar. 
![image](https://github.com/user-attachments/assets/f116a1bf-40f8-4bcf-84aa-785e2550f4b7)

### Mis Turnos
Me permite ver los turnos que tuve desde que me registre. Permite filtrar por medico o especialidad desde el mismo buscador y permite cancelarlos o dejar review.
![image](https://github.com/user-attachments/assets/7e91ce35-233a-4795-9cfb-7e66cb5b76ec)

## Especialista
El especialista podra ver:
* Mis Turnos
* Perfil

### Perfil
Dentro del perfil se pueden ver los datos personales y asi mismo permite editar la disponibilidad horaria que tiene de cada una de las especialidades con las que se registro al principio. Se esta considerando el hecho de agregar o quitar especialidades de los especialistas.
![image](https://github.com/user-attachments/assets/f52722db-e25a-4c29-974b-a3c96cadb49b)


