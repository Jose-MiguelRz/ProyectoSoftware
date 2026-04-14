Quiero que modifiques únicamente la pantalla /guia (“Guía Paso a Paso”) del proyecto de Prácticas para que existan DOS VISTAS dentro de la misma página, sin eliminar ni romper la UI actual:

TAB 1: “Guía rápida (8 pasos)”
- CONSERVAR la guía actual tal como está (tarjetas 1–8, duración, “Detalles del paso”, botones Anterior/Siguiente/Finalizar y barra “Progreso del Proceso”).
- Solo pulir espaciado/jerarquía visual si hace falta, sin reescribir el contenido.

TAB 2: “Proceso UDLAP (etapas)”
- Crear una vista nueva tipo “flujo universitario” con stepper vertical + panel de detalle (desktop 2 columnas; mobile acordeones).
- MUY IMPORTANTE: USA EXACTAMENTE LOS TEXTOS Y LISTAS QUE TE DOY ABAJO. NO INVENTES COPYS, NO AGREGUES PASOS QUE NO ESTÉN AQUÍ.

A) LAYOUT GENERAL (ambas tabs)
1) Encabezado:
   - Título: “Guía Paso a Paso”
   - Subtítulo: “Elige la vista que prefieras para avanzar.”
   - Mini-resumen (derecha):
     - “Progreso general: X%”
     - “Paso actual: #/8” (solo tab Guía rápida)
     - “Etapa actual: #/9” (solo tab Proceso UDLAP)
     - “Próxima acción: …”

2) Selector de vista (segmented control/tabs):
   - Opción 1: “Guía rápida (8 pasos)” (DEFAULT)
   - Opción 2: “Proceso UDLAP (etapas)”
   - Guardar preferencia en localStorage: guideView = "quick" | "udlap"

3) Botón fijo de soporte (floating o en header):
   - “Enviar duda”
   - Al dar click, abrir modal con textarea y botón “Aceptar” y “Cancelar”.

B) PROCESO UDLAP (ETAPAS) — ESTRUCTURA
- Stepper vertical con 9 etapas:
  1. Acceso y requisitos
  2. Registro
  3. Curso de preparación
  4. Currículum (CV)
  5. Explorar proyectos y postularme
  6. Postulaciones, entrevista y resultado
  7. Inscripción de materia
  8. Seguimiento, formalización y documentos
  9. Práctica en curso y cierre

- Cada etapa (en el stepper) muestra:
  - Icono + título
  - Descripción 1 línea
  - Chip de estado: Bloqueado | Disponible | En revisión | Con observaciones | Aprobado | Completado
  - Duración estimada (si aplica)
  - Si está bloqueado, tooltip: “Completa X para habilitar”

- Panel de detalle (derecha) al elegir una etapa:
  Debe tener SIEMPRE estas secciones:
  1) Resumen corto (qué es y para qué)
  2) “Qué necesitas para avanzar” (checklist)
  3) “Acciones” (CTA principal + secundarios)
  4) “Documentos / Entregables” (tarjetas con estado y acción)
  5) “Ayuda” (FAQ breve + botón Enviar duda)

- Comportamiento “gated”:
  - Si etapa Bloqueada: mostrar caja “Te falta para habilitar” (máx 3 bullets) + deshabilitar CTA.
  - Mostrar siempre “Siguiente mejor acción” arriba del panel.

C) CONTENIDO EXACTO POR ETAPA (NO INVENTAR)
Define estas 9 etapas con los siguientes textos EXACTOS:

ETAPA 1 — “Acceso y requisitos”
Descripción: “Verifica que cumples los requisitos para ingresar al sistema y comenzar tus prácticas.”
Qué necesitas para avanzar (checklist):
- “Contar con equipo de escritorio o laptop.”
- “Contar con navegador compatible: Google Chrome, Firefox, Microsoft Edge o Safari.”
- “Ingresar al sistema con tu ID y contraseña institucional (y adicional si aplica).”
- “Ser estudiante activo de grado Licenciatura o Bachelor.”
- “Tener 120 unidades aprobadas.”
- “Si tienes más de una licenciatura, seleccionar con cuál realizarás tus prácticas.”
Acciones:
- CTA: “Ir a iniciar sesión”
- Secundarios: “Ver requisitos”, “Enviar duda”
Documentos / entregables:
- “N/A”

ETAPA 2 — “Registro”
Descripción: “Realiza tu registro para abrir el proceso.”
Qué necesitas para avanzar (checklist):
- “Estar dentro de las fechas de registro.”
Acciones:
- CTA: “Iniciar registro”
- Secundarios: “Actualizar registro”, “Ver estado de registro”
Contenido adicional (sub-sección dentro del panel):
- “Actualizar registro: podrás modificar algunos datos personales y el contacto de emergencia; también podrás cancelar o activar tu registro solo si no has avanzado más allá del proceso.”
Sub-sección “Registro extemporáneo”:
- Texto: “Si no realizaste el registro dentro del periodo, puedes solicitar registro extemporáneo solo dentro de fechas permitidas. La solicitud se envía a valoración del área.”
- Checklist:
  - “Ingresar una justificación.”
  - “Esperar resolución (aprobada o rechazada) por correo.”
  - “Solo si está ‘En revisión’, puedes cancelar la solicitud; si cancelas, no podrás volver a realizarla en el mismo periodo.”
Acciones registro extemporáneo:
- CTA: “Solicitar registro extemporáneo”
- Secundario: “Cancelar solicitud (solo si En revisión)”

ETAPA 3 — “Curso de preparación”
Descripción: “Completa el curso de preparación para habilitar tu CV.”
Qué necesitas para avanzar (checklist):
- “Haber realizado el Registro.”
- “Estar dentro de las fechas indicadas por correo electrónico.”
Acciones:
- CTA: “Ver resultado del curso”
- Secundario: “Enviar duda”
Contenido (mostrar en panel):
- “Al entrar, se muestra un modal con resultado, fecha de realización de cursos y puntaje por módulo (si ya los realizaste y el área cargó resultados).”
Salida/next:
- “Siguiente etapa: Currículum (CV).”

ETAPA 4 — “Currículum (CV)”
Descripción: “Crea o carga tu CV y envíalo a revisión para poder postularte.”
Qué necesitas para avanzar (checklist):
- “Resultado global del curso de preparación: Aprobado.”
- “Estar dentro de fechas para crear o modificar el CV.”
Acciones (tabs internos):
TAB A: “Cargar un CV (PDF)”
- Checklist:
  - “Seleccionar archivo .PDF.”
  - “Nombrar tu CV con tu ID y nombre completo.”
  - “El PDF no debe superar 5 MB.”
  - “El nombre del archivo no debe contener puntos o caracteres especiales.”
- CTA: “Cargar y enviar a revisión”
TAB B: “Capturar CV (en el sistema)”
- Checklist:
  - “Capturar datos requeridos en todas las pestañas.”
  - “Cargar fotografía en formato .JPG, .JPEG o .PNG (≤ 5 MB).”
  - “El nombre del archivo no debe contener puntos o caracteres especiales.”
  - “Guardar avances (estatus: Borrador).”
  - “Enviar mi CV a revisión.”
Estados del CV (mostrar chip + qué hacer):
- “Borrador: puedes continuar editando.”
- “En revisión: espera revisión del área.”
- “Con observaciones: ver comentarios, corregir y reenviar a revisión.”
- “Cancelado: CV cancelado.”
- “Aprobado: puedes continuar a postulación.”

ETAPA 5 — “Explorar proyectos y postularme”
Descripción: “Consulta organizaciones y proyectos disponibles y postúlate.”
Qué necesitas para avanzar (checklist):
- “Curso de preparación: Aprobado.”
- “CV: Aprobado.”
- “No haber llegado al límite de postulaciones (1).”
- “Estar dentro de fechas para realizar postulaciones.”
Acciones:
- CTA: “Ver proyectos y postularme”
- Secundarios: “Filtrar organizaciones”, “Enviar duda”
Contenido:
- “Ver organizaciones y proyectos disponibles.”
- “Si tu carrera/materia lo permite, también puedes postularte a Autogestión o Equipo representativo.”
Sub-sección “Proponer organización” (solo si dentro de fechas):
- Texto: “Puedes proponer una organización no listada. Al proponer, no podrás postularte a otro proyecto; debes esperar a que la organización registre datos, se registre el proyecto y sea aprobado por el comité.”
- Checklist:
  - “Capturar datos de la organización y del contacto.”
  - “Confirmar para enviar correo electrónico al contacto.”
  - “Estatus de propuesta: ‘Alta por parte del estudiante’.”
  - “Esperar a que se apruebe; si no se registra o no se aprueba, esperar a que el área cancele la propuesta para poder postularte a otra organización.”
Acciones proponer:
- CTA: “Proponer organización”

ETAPA 6 — “Postulaciones, entrevista y resultado”
Descripción: “Da seguimiento a tus postulaciones, entrevistas y al resultado final.”
Qué necesitas para avanzar (checklist):
- “Haber realizado una postulación.”
Acciones:
- CTA: “Ver mis postulaciones”
- Secundarios: “Enviar duda”
Contenido (dentro del panel, mostrar módulos):
MÓDULO “Ver avance y detalle”:
- “Abrir el avance y, para ver detalle, entrar a ‘Ver la postulación’.”
MÓDULO “Cancelar postulación”:
- Regla: “Puedes cancelar solo si el estatus es: ‘Postulado’, ‘Con entrevista’ o ‘Entrevistado’.”
- Checklist:
  - “Ingresar comentario con la razón.”
  - “Al cancelar, no podrás volver a postularte a ese proyecto.”
  - “Se envía correo a la organización informando la cancelación.”
MÓDULO “Carta de presentación para postulación (opcional)”:
- Consideraciones:
  - “No podrá ser emitida ‘a quien corresponda’.”
  - “El trámite continúa en Servicios Escolares una vez enviado por el coordinador; el estudiante recibe copia del correo.”
  - “Cambios posteriores pueden generar costo de emisión.”
  - “El tiempo de conservación del documento es de seis meses.”
- Pasos:
  - “Solicitar (llenar datos en modal).”
  - “Firmar electrónicamente con ID y contraseña institucional.”
  - “Cuando recibas la carta, cargarla en PDF (≤5 MB y sin puntos/caracteres especiales en el nombre).”
  - “Una vez cargada, la organización podrá visualizarla.”
MÓDULO “Entrevista”:
- “La organización propone fecha y modalidad. Te llegará un correo con fecha/hora, modalidad, lugar/teléfono/enlace, entrevistador y comentarios.”
- Botones:
  - “Confirmar entrevista” (envía correo a organización).
  - “Proponer otra fecha y hora” (elige fecha/hora + justificación; la organización debe aceptar; si no acepta, la entrevista se cancela y deben agendar otra).
MÓDULO “Resultado de la postulación”:
- “La organización puede aceptarte, rechazarte o solicitar otra entrevista.”
- Si te aceptan:
  - Botón “Aceptar colaborar en el proyecto” (después debes esperar a que la organización firme documentos de inicio; el sistema avisa por correo o se consulta en plataforma).
  - Botón “No aceptar colaborar en el proyecto” (ingresar razón; se notifica por correo a la organización; debes postularte a otro proyecto antes de la fecha final del proceso).
- Nota: “Si la Carta Compromiso es requisito, deberás ir a Seguimiento a mis prácticas para firmarla.”

ETAPA 7 — “Inscripción de materia”
Descripción: “Inscribe tu materia de prácticas cuando se abra el periodo.”
Qué necesitas para avanzar (checklist):
- “Estar dentro de las fechas para inscribir la materia de prácticas.”
Acciones:
- CTA: “Ver información de inscripción”
Contenido:
- “Al entrar a esta opción se muestra un mensaje informativo.”

ETAPA 8 — “Seguimiento, formalización y documentos”
Descripción: “Gestiona tu práctica activa, cumple requisitos de formalización y evita cancelaciones por incumplimiento.”
Qué necesitas para avanzar (checklist):
- “Tener una práctica aceptada por la organización.”
Contenido clave (mostrar alerta):
- “Debes cumplir requisitos antes de las fechas límite; de lo contrario, la Dirección de Prácticas en la Profesión podría cancelar tu práctica.”
Documentos / entregables (tarjetas con estado + CTA):
1) “Carta de inicio” (si aplica)
   - Texto: “Se genera cuando la organización firma documentos de aceptación.”
   - Acción: “Ver”
2) “Carta compromiso” (si aplica)
   - Texto: “Debes leerla detenidamente y firmarla electrónicamente con ID y contraseña institucional.”
   - Acciones: “Leer y firmar”, “Ver”
3) “Póliza de seguro de gastos médicos mayores + Carta responsiva”
   - Checklist:
     - “Cargar póliza vigente antes de la fecha límite.”
     - “El PDF no debe superar 5 MB.”
     - “El nombre del archivo no debe contener puntos o caracteres especiales.”
     - “Leer carta responsiva y firmar electrónicamente con ID y contraseña institucional.”
   - Estados:
     - “SIN INGRESAR” (pendiente de revisión del área)
     - “PÓLIZA VIGENTE”
     - “PÓLIZA VENCIDA” (si está vencida, cargar otra póliza vigente de inmediato)
   - Acciones: “Cargar póliza”, “Firmar responsiva”, “Ver responsiva”
4) “Carta de presentación para prácticas (opcional)”
   - Consideraciones:
     - “No podrá ser emitida ‘a quien corresponda’.”
     - “El trámite continúa en Servicios Escolares.”
     - “Cambios posteriores pueden generar costo.”
     - “Conservación: seis meses.”
   - Pasos:
     - “Solicitar (llenar datos en modal).”
     - “Firmar electrónicamente con ID y contraseña institucional.”
     - “Tras recibir la carta, cargarla en PDF (≤5MB y sin puntos/caracteres especiales en el nombre).”
   - Acciones: “Solicitar”, “Cargar carta”, “Ver”

ETAPA 9 — “Práctica en curso y cierre”
Descripción: “Durante tu práctica, gestiona evaluaciones, curso de control (si aplica), documentos de autogestión y finaliza correctamente.”
Secciones internas del panel:

A) “Curso de control” (si aplica)
- Texto: “Si tu práctica se extiende un periodo más, contacta a tu Coordinador para que asigne un curso de control.”
- Reglas:
  - “Si se asigna, llega correo informativo.”
  - “Se muestra estatus y periodo extendido; al dar clic en el periodo se ve detalle.”

B) “Evaluaciones”
- Texto: “Durante la práctica debes contestar evaluación intermedia y evaluación de experiencia (en algunos tipos de prácticas) dentro de las fechas definidas.”
- Acciones:
  - “Contestar” (abre modal, completar datos y Finalizar)
  - “Ver” (consulta evaluación ya contestada)

C) “Evaluación de desempeño”
- Caso 1: “Si la organización la realizó y autorizó vista, podrás verla.”
- Caso 2 (Autogestión + materia Prácticas 2):
  - “Descargar formato”
  - “La organización llena datos y firma”
  - “Escanear y cargar PDF (≤5 MB, sin puntos/caracteres especiales)”
  - “Una vez cargado, se puede visualizar”

D) “Requisitos de la práctica en curso (solo Autogestión)”
Práctica 1:
1) “Formato presentación del proyecto de autogestión”
   - “Llenar antes de fecha límite (capturar datos solicitados).”
   - “Una vez firmado, se puede ver.”
2) “Copia digital del proyecto de autogestión a presentar”
   - “Cargar antes de fecha límite.”
   - “PDF ≤5 MB; nombre sin puntos/caracteres especiales.”
   - “Tras cargar, se puede descargar.”
Práctica 2:
1) “Carta de aceptación del proyecto de autogestión”
   - “Capturar datos y guardar.”
   - “Imprimir para firma de la organización.”
   - “Escanear y cargar PDF (≤5 MB; nombre sin puntos/caracteres especiales).”
   - “Tras cargar, se puede descargar.”
2) “Copia compromiso autogestión”
   - “Imprimir, llenar datos y firmar por la organización.”
   - “Escanear y cargar PDF (≤5 MB; nombre sin puntos/caracteres especiales).”
   - “Tras cargar, se puede descargar.”

E) “Práctica liberada” (cuando aplique)
- Texto: “Liberada significa que la organización finalizó tu práctica, pero tienes evaluaciones y/o documentos pendientes. Al cumplirlos, podrás finalizar tu práctica.”
- Sub-sección “Evaluaciones pendientes”: “Contestar evaluaciones pendientes.”
- Sub-sección “Carta de término autogestión” (solo Autogestión + Prácticas 2):
  - “Imprimir carta con datos.”
  - “Firma de organización.”
  - “Escanear y cargar PDF (≤5MB; sin puntos/caracteres especiales).”
  - “Tras cargar, se puede descargar.”
- Acción principal: botón “Finalizar práctica” (solo habilitado cuando no haya pendientes)

F) “Práctica finalizada”
- Texto: “Cuando el estatus es Finalizada, significa que has terminado tu práctica. Puedes ver evaluaciones y documentos de cierre (si aplica).”

G) “Opciones para segunda práctica” (solo si: Práctica finalizada + materia Prácticas 1 + tipo ‘Práctica en organización’)
- Opción 1: “Realizar prácticas en otra organización”
  - “Iniciar registro cuando se abra el periodo.”
  - “Postularse cuando se abra el periodo de postulaciones.”
- Opción 2: “Continuar en el mismo proyecto u otro de la misma organización”
  - “Iniciar registro cuando se abra el periodo.”
  - “Postularse en la misma organización cuando se abra el periodo.”
- Opción 3: “Solicitar acreditar horas excedentes”
  - “Llenar formulario de solicitud.”
  - “La dirección de prácticas revisa y resuelve.”
  - “Esperar resultado.”

H) “Solicitar acreditación de horas” (si aplica)
- Botón: “Acreditación de horas”
- Flujo:
  - “Abrir modal; ingresar comentario; confirmar solicitud.”
  - “Se puede ver la solicitud desde el mismo botón o desde ‘Datos generales de la práctica’.”
  - “Se puede cancelar solo si el estatus es ‘En validación’.”
  - “También se ve desde pantalla de inicio con enlace ‘Solicitud de acreditación de horas’.”
  - “Llega correo con resolución; si se aprueba, Práctica 2 aparece con estatus ‘Acreditación de horas’.”

D) CONEXIÓN ENTRE TABs (para que existan ‘las dos’ sin duplicar)
- En TAB “Proceso UDLAP”, agrega un botón en el panel de detalle: “Ver guía rápida relacionada”.
- Al dar click:
  1) Cambia a TAB “Guía rápida (8 pasos)”
  2) Hace scroll al paso relacionado usando este mapeo:
     - Etapa 1 → Paso 1
     - Etapa 5 → Paso 2
     - Etapa 6 → Paso 3
     - Etapa 8 → Paso 4 y/o 5
     - Etapa 9 → Paso 6–8

E) ESTILO VISUAL
- Reutilizar componentes existentes (cards, botones, chips).
- Mantener estética actual.
- Chips de estado claros y consistentes.
- Evitar saturación: usar acordeones y tarjetas por documento.

ENTREGABLE:
- Un frame principal /guia con tabs “Guía rápida” y “Proceso UDLAP”.
- Desktop y mobile.
- Sin eliminar la guía actual.
- Con el contenido exacto anterior (sin inventar textos).

