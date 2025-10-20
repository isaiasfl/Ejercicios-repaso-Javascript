# 💻 Ejercicios de Repaso — JavaScript Mañana 2025

**Repositorio oficial del profesor:**  
👉 `git@github.com:isaiasfl/Ejercicios-repaso-Javascript.git`

---

## ✳️ Autor

👨‍🏫 **Isaías Fernández Lozano**  
GitHub: [isaiasfl](https://github.com/isaiasfl)

---

## 🎯 Objetivo del repositorio

Este repositorio está diseñado para que el alumnado practique **JavaScript moderno** a través de ejercicios individuales y autocontenidos.  
Cada estudiante trabajará sobre **su propio fork** del repositorio, desarrollará el ejercicio asignado dentro de una **carpeta dedicada**, y finalmente enviará una **Pull Request (PR)** al profesor para revisión y calificación.

---

## 🧭 Flujo de trabajo completo

### 1️⃣ Hacer un FORK del repositorio del profesor

Un _fork_ es una **copia personal** de un repositorio en tu cuenta de GitHub.  
Permite trabajar libremente sin modificar el original.

**Pasos:**

1. Entra en el repositorio del profesor:  
   👉 [https://github.com/isaiasfl/Ejercicios-repaso-Javascript](https://github.com/isaiasfl/Ejercicios-repaso-Javascript)
2. Haz clic en el botón **"Fork"** (arriba a la derecha).
3. Confirma tu cuenta (por ejemplo `@nombrealumno`) y espera unos segundos.  
   Se creará una copia del repositorio en tu GitHub.

---

### 2️⃣ Clonar tu fork en tu equipo local

Abre la terminal y ejecuta:

```bash
git clone git@github.com:TU_USUARIO/Ejercicios-repaso-Javascript.git
cd Ejercicios-repaso-Javascript
```

🔹 **Consejo:** Verifica que el remoto `origin` apunta a tu fork con:

```bash
git remote -v
```

Debe aparecer algo como:

```
origin  git@github.com:TU_USUARIO/Ejercicios-repaso-Javascript.git (fetch)
origin  git@github.com:TU_USUARIO/Ejercicios-repaso-Javascript.git (push)
```

---

### 3️⃣ Añadir el remoto del profesor (upstream)

Para poder descargar futuras actualizaciones o nuevos ejercicios añadidos por el profesor, añade el repositorio original como remoto `upstream`:

```bash
git remote add upstream git@github.com:isaiasfl/Ejercicios-repaso-Javascript.git
```

Puedes comprobar que todo está correcto con:

```bash
git remote -v
```

Deberías ver algo así:

```
origin    git@github.com:TU_USUARIO/Ejercicios-repaso-Javascript.git (fetch)
origin    git@github.com:TU_USUARIO/Ejercicios-repaso-Javascript.git (push)
upstream  git@github.com:isaiasfl/Ejercicios-repaso-Javascript.git (fetch)
upstream  git@github.com:isaiasfl/Ejercicios-repaso-Javascript.git (push)
```

---

### 4️⃣ Sincronizar con el profesor cuando haya actualizaciones

Si el profesor añade nuevos ejercicios o cambios importantes, puedes traerlos a tu fork con:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

Esto mantendrá tu repositorio **actualizado** sin perder tu trabajo.

---

### 5️⃣ Crear una rama para tu ejercicio

Cada alumno debe trabajar **en una rama propia** con la siguiente estructura:

> `ejercicio-XX-Nombre-InicialesApellidos`

📘 Ejemplo:

```bash
git checkout -b ejercicio-04-IFL
```

Esta rama servirá para desarrollar únicamente el ejercicio asignado.

---

### 6️⃣ Realizar el ejercicio

Los ejercicios se ubican dentro de la carpeta:

```
/srv/helpers/EjercicioXX
```

Por ejemplo, si te ha tocado el ejercicio 04:

```
/srv/helpers/Ejercicio04
```

Crea o modifica los archivos necesarios dentro de tu carpeta, sin tocar los demás ejercicios del repositorio.

---

### 7️⃣ Subir los cambios a tu fork

Guarda tu progreso con:

```bash
git add .
git commit -m "feat: resolver Ejercicio04"
git push origin ejercicio-04-IFL
```

---

### 8️⃣ Crear una Pull Request (PR)

1. Entra en tu **repositorio en GitHub** (tu fork).
2. Verás un mensaje que te invita a crear una _Pull Request_ → haz clic en **Compare & Pull Request**.
3. Asegúrate de que:
   - La PR va **de tu rama** (`ejercicio-04-IFL`)
     → **hacia la rama `main`** del profesor (`isaiasfl/Ejercicios-repaso-Javascript`).
   - Añades un mensaje claro en la descripción, por ejemplo:

     > “Ejercicio 04 completado — Indica tu nombre y explicación breve de tu ejercicio ”

4. Envía la PR.

---

### 9️⃣ Revisión y validación

El profesor revisará las PR recibidas, comprobará el funcionamiento del ejercicio y decidirá si:

- ✅ **Acepta la PR** y la integra en `main`.
- 🔁 **Solicita cambios** (con comentarios explicativos).

Una vez aceptada, el ejercicio quedará validado y puntuado.

---

## ⚙️ Conflictos y resolución

Si varios alumnos hacen _Pull Requests_ al mismo tiempo, **no habrá conflictos**, ya que:

- Cada alumno trabaja en una **carpeta independiente** (`Ejercicio01`, `Ejercicio02`, etc.).
- No deben modificarse archivos fuera de esa carpeta.

En caso excepcional de conflicto (por ejemplo, modificación accidental del `README.md`), el profesor gestionará la resolución de forma centralizada.

---

## 💡 Recomendaciones

- No trabajes nunca directamente sobre `main`.
- Realiza _commits_ claros y frecuentes.
- Asegúrate de probar tu código antes de subirlo.
- No elimines ni modifiques archivos de otros ejercicios.
- Revisa que tu PR indique correctamente el ejercicio y tus iniciales.
- Sincroniza tu fork con el del profesor antes de empezar un nuevo ejercicio.

---

## 🧩 Estructura del proyecto

```
📦 Ejercicios-repaso-Javascript
 ┣ 📂 .devcontainer/     → entorno de desarrollo preconfigurado
 ┣ 📂 srv/
 ┃ ┗ 📂 helpers/
 ┃   ┣ 📂 Ejercicio01/
 ┃   ┣ 📂 Ejercicio02/
 ┃   ┣ 📂 Ejercicio03/
 ┃   ┗ 📂 Ejercicio04/
 ┣ 📜 README.md
 ┗ 📜 .gitignore
```

---

## 🧠 En resumen

| Paso | Acción                      | Comando o Descripción                           |
| ---- | --------------------------- | ----------------------------------------------- |
| 1    | Hacer fork                  | Desde la web de GitHub                          |
| 2    | Clonar el fork              | `git clone`                                     |
| 3    | Añadir remoto del profesor  | `git remote add upstream ...`                   |
| 4    | Sincronizar actualizaciones | `git fetch upstream && git merge upstream/main` |
| 5    | Crear rama                  | `git checkout -b ejercicio-XX-Nombre`           |
| 6    | Realizar ejercicio          | `/srv/helpers/EjercicioXX`                      |
| 7    | Subir cambios               | `git add . && git commit && git push`           |
| 8    | Crear PR                    | Desde GitHub                                    |
| 9    | Validación                  | El profesor revisa y califica                   |

---

✉️ **Contacto:**
Para cualquier incidencia o duda, contacta por el aula virtual o a través del canal habitual del módulo.

---

📘 _"El código limpio no nace, se construye."_
— _Isaías Fernández Lozano_
