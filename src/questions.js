const n = n => parseFloat(String(n).replace(/[^0-9.]/ig, ''))
const tagVERDADEROFALSO = 'VERDADERO O FALSO'

const sortAsc = (a, b) => a > b
const sortAlwaysEnd = (opt) => (a, b) => a === opt ? 1 : 0

/**
 * @typedef {{title:string,options:string[],sort?:Function,stag?:string}} Question
 */

 /**
 * @type {Question[]}
 */
const questions = [
  {
    title: '¿En cuál de las siguientes situaciones se realiza manejo manual de carga?',
    options: [
      'Al levantar un saco de alimentos de 20 kg.',
      'Al usar una grúa horquilla para mover un pallet con sillas.',
      'Al levantar un motor 120 kg. con un tecle.',
      'Al transportar un martillo desde un lugar a otro.',
    ],
  },
  {
    title: '¿Cuál de las siguientes es una característica de un objeto o ser vivo para considerarse “carga”?',
    options: [
      'Que tenga más de 3 kg.',
      'Que según el trabajador sea un objeto “pesado”',
      'Que tenga más de 20 kg y requiera ser transportado.',
      'Que requiera ser transportado, no importando su peso.',
    ],
  },
  {
    title: 'Jorge, es un joven que está próximo a cumplir los 18 años, y trabaja levantando cajas de hasta 25 kg y las traslada manualmente de un lugar a otro ¿Qué incumplimiento de la normativa se ha producido en este caso?',
    options: [
      'Por su edad Jorge no puede mover una carga de ese peso.',
      'Jorge no puede transportar carga de ese peso sin ayuda de una máquina.',
      'Jorge debe utilizar una carretilla (yegua) para su transporte.',
      'La carretilla debe, por ley, utilizarse siempre por debajo de los hombros y por encima de la cintura.',
    ],
  },
  {
    //
    title: 'Las siguientes opciones muestran condiciones de trabajo asociadas al manejo manual de carga ¿Cuál de estas acciones está prohibida según la ley Nº 20.001?',
    options: [
      'Que una trabajadora cargue bultos de más de 20 kg.',
      'Que un trabajador mueva sacos de cemento apoyados en el hombro.',
      'Que una trabajadora necesite estirar sus brazos para manejar una carga.',
      'Que un trabajador levante paquetes desde el suelo usando una sola mano.',
    ],
  },
  {
    title: '¿Cuál de los siguientes es un riesgo asociado a las características de la carga a manipular?',
    options: [
      'La carga es cilíndrica y voluminosa.',
      'La carga tiene asas.',
      'La carga es compacta y fácil de tomar.',
      'La carga posee un peso de 4 kg.',
    ],
  },
  {
    title: 'Una trabajadora debe mover varias bolsas voluminosas de un extremo a otro del piso de una tienda de retail. ¿Cuál de las siguientes es una condición de riesgo asociado a la tarea a realizar?',
    options: [
      'El trayecto presenta escaleras y obstáculos.',
      'Transporta la carga procurando que las bolsas tengan el mismo peso.',
      'El lugar se encuentra suficientemente iluminado.',
      'Mantiene las bolsas pegado al cuerpo cuando las transporta.',
    ],
  },
  {
    title: '¿Cuál de las siguientes precauciones deben observarse al sostener una caja con carga en los brazos?',
    options: [
      'Apegar la caja al cuerpo.',
      'Arquear levemente las rodillas.',
      'Alejar un poco la caja del pecho.',
      'Mantener los brazos separados del cuerpo.',
    ],
  },
  {
    title: 'Si se desea levantar una carga desde el suelo, ¿Cuál de las siguientes prácticas debería llevarse a cabo para realizar un correcto manejo manual de carga?',
    options: [
      'Doblar las rodillas para alcanzar la caja desde el piso.',
      'Mantener los brazos estirados mientras se levanta la carga.',
      'Inclinar el tronco y mantener los brazos alejados del cuerpo.',
      'Ejercer la fuerza principalmente con los brazos para alzar la carga.',
    ],
  }, {
    title: '¿Cuál de las siguientes precauciones deben observarse al empujar una carga?',
    options: [
      'Mantener una visión amplia alrededor de la carga.',
      'Desplazar la carga por más de 50 metros sin descansar.',
      'Ejercer una fuerza inicial alta para poner en movimiento la carga.',
      'Preferir mantener las manos por debajo de la cintura al realizar el movimiento.',
    ],
  }, {
    title: 'Los trabajadores hombres, no deberán manipular cargas superiores a:',
    options: [
      '25 kilos',
      '70 kilos',
      '80 kilos',
      '90 kilos',
    ],
    sort: sortAsc,
  },
  {
    title: 'Los principales riesgos asociados a la carga dependen de:',
    options: [
      'Todas las anteriores.',
      'El volumen de la carga y si la carga está en equilibrio.',
      'Si la carga se maneja pegada al tronco y sin torsión.',
      'Si la forma y consistencia de la carga puede ocasionar lesiones al trabajador, en particular golpes.',
    ],
    sort: sortAlwaysEnd('Todas las anteriores.'),
  },
  {
    title: 'Es una buena práctica  en el levantamiento de carga:',
    options: [
      'Acercar al máximo el objeto al cuerpo.',
      'Juntar los pies hasta conseguir una postura estable.',
      'Mantener las rodillas muy rectas.',
      'Girar el tronco mientras se levanta la carga.',
    ],
  }, {
    title: 'Los principales riesgos asociados a las exigencias de la actividad dependen de:',
    options: [
      'Si el período de reposo fisiológico o de recuperación resulta insuficiente.',
      'Si las distancias de levantamiento, descenso y/o transporte son considerables.',
      'Si el ritmo impuesto por un proceso no puede ser controlado por el trabajador.',
      'Todas las anteriores.',
    ],
  }, {
    title: 'Para los menores de 18 años y las mujeres, la carga máxima de manejo o manipulación manual será de:',
    options: [
      '20 kilos.',
      '25 kilos.',
      '10 kilos.',
      '15 kilos.',
    ],
    sort: sortAsc,
  }, {
    title: '¿Cuál de las siguientes es una característica de un objeto inanimado para considerarse como carga?',
    options: [
      'Que tenga más de 3 kg.',
      'Que requiera el uso de maquinaria para moverse.',
      'Que tenga más de 20 kg y requiera ser transportado.',
      'Que requiera ser transportado, no importando su peso.',
    ],
  }, {
    title: 'Las siguientes opciones muestran factores de riesgos asociados al movimiento manual de carga ¿Cuál de estas acciones está prohibida según la ley Nº 20.001?',
    options: [
      'Que una trabajadora cargue paquetes de más de 20 kg.',
      'Que un trabajador mueva sacos de cemento apoyados en el hombro.',
      'Que una trabajadora necesite estirar sus brazos para manejar una carga.',
      'Que un trabajador levante paquetes desde el suelo usando una sola mano.',
    ],
  },
  {
    title: '¿Cuál de las siguientes precauciones deben observarse al sostener una caja con carga en los brazos?',
    options: [
      'Apegar la caja al pecho.',
      'Arquear levemente las rodillas.',
      'Alejar un poco la caja del pecho.',
      'Mantener los brazos separados del cuerpo.',
    ],
  }, {
    title: '¿Cuál es el límite de carga máxima legal que puede levantar un hombre de forma manual sin ayuda mecánica?',
    options: [
      '25 Kg',
      '20 Kg',
      '80 Kg',
      '30 Kg',
    ],
    sort: sortAsc,
  }, {
    title: '¿Cuál es límite de carga máxima legal que puede levantar un menor de edad de forma manual sin ayuda mecánica?',
    options: [
      '20 Kg',
      '50 Kg',
      '0 Kg',
      '25 Kg',
    ],
    sort: sortAsc,
  }, {
    title: '¿Cuál es límite de carga máxima legal que puede levantar una mujer de forma manual sin ayuda mecánica?',
    options: [
      '20 Kg',
      '50 Kg',
      '0 Kg',
      '25 Kg',
    ],
    sort: sortAsc,
  }, {
    title: 'La empresa debe:',
    options: [
      'Todas las anteriores.',
      'Capacitar a los trabajadores en los riesgos asociados a la manipulación manual de carga y los procedimientos para prevención.',
      'Implementar ayudas mecánicas para reducir el esfuerzo realizado por el trabajador cuando sea posible.',
      'Realizar un registro de las tareas que implican manejo manual de carga y de los trabajadores expuestos.',
    ],
    sort: sortAlwaysEnd('Todas las anteriores.'),
  }, {
    title: 'Para poder minimizar otros riesgos que pueden estar asociados a la tarea de manejo manual de cargas se debe considerar los siguientes aspectos:',
    options: [
      'Todas las anteriores.',
      'Los suelos son un factor influyente, sobretodo en el caso de existir rampas.',
      'Evitar maniobrar cargas en suelos resbaladizos.',
      'Usar calzado antideslizante.',
    ],
    sort: sortAlwaysEnd('Todas las anteriores.'),
  },
  {
    title: 'En las actividades relacionadas con el manejo manual de cargas es necesario establecer rutinas de pausas activas, para:',
    options: [
      'Todas las anteriores.',
      'Fomentar la compensación de los sobre esfuerzos e inadecuadas posturas que se generan.',
      'Regular el peso de las cargas transportadas.',
      'Mejorar la postura.',
    ],
    sort: sortAlwaysEnd('Todas las anteriores.'),
  }, {
    title: 'La Ley N° 20.001 comúnmente conocida como Ley del Saco, tiene como propósito principal:',
    options: [
      'La protección de la salud de los trabajadores, estableciendo las medidas preventivas para minimizar los riesgos derivados del manejo manual de cargas y la utilización de mecanismos adecuados.',
      'La regulación de los mecanismos que influyen en el transporte de mecanismos pesados',
      'Establecer medidas que regulen el peso máximo que pueden transportar vehículos motorizados o de tracción animal.',
      'La protección de la salud de los trabajadores, estableciendo ejercicios preventivos para mantener la salud en condición óptima.',
    ],
  },
  {
    title: '¿Qué factores intervienen en el proceso de manipulación de una carga?',
    options: [

      'Todas las anteriores.',
      'Características de la carga.',
      'Esfuerzo físico.',
      'Características del medio de trabajo.',

    ],
    sort: sortAlwaysEnd('Todas las anteriores.'),
  },
  {
    title: '¿Cuáles pueden ser las causas de lesiones por un incorrecto MMC?',
    options: [
      'Todas las anteriores.',
      'La magnitud de los esfuerzos (peso o volumen de la carga excesivos).',
      'Alta frecuencia de los esfuerzos (repetición de movimientos para tareas de manipulación manual de cargas, durante la jornada de trabajo).',
      'Entorno ambiental (falta de espacio, superficie deslizantes, iluminación insuficiente, aire, humedad, o temperatura inadecuada, vibraciones y ruido excesivo, etc.).',
    ],
    sort: sortAlwaysEnd('Todas las anteriores.'),
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Existen 3 tipos de manejo manual de cargas; el levantamiento y descenso, el transporte, empuje y arrastre.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'La temperatura, humedad o circulación del aire no tienen relación con los riesgos asociados al ambiente de trabajo.',
    options: [
      'Falso',
      'Verdadero',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Los principales riesgos asociados al esfuerzo físico dependen de por ejemplo, si es esfuerzo es intenso, repetitivo o prolongado.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Al momento de realizar empuje y arrastre, es necesario evaluar, por ejemplo, el peso de la carga y la distancia de traslado.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'En el caso de las embarazadas, el peso máximo de carga y descarga manual es de 10 kilos.',
    options: [
      'Falso',
      'Verdadero',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Carga es cualquier objeto, animado o inanimado, que se requiera mover utilizando fuerza humana y cuyo peso supere los 3 kilógramos.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Cuando se manipula una carga lo ideal es que esté lo más alejada del cuerpo.',
    options: [
      'Falso',
      'Verdadero',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Los medios o ayudas mecánicas "Corresponden a aquellos elementos mecanizados que reemplazan o reducen el esfuerzo físico asociado al manejo manual de carga".',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Para prevenir lesiones de espalda acomode los materiales más altos del nivel del suelo, para que no tenga que doblarse tanto al levantarlos.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'En la organización del trabajo se debe acomodar el material donde hay espacio para levantarlo con seguridad, sin que al tener que alcanzarlo deba doblarse.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'En la planificación del trabajo y flujo de materiales lo ideal es que los materiales sean entregados cerca de donde se van a usar.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Levantar el máximo de peso es lo que evita lesiones de espalda.',
    options: [
      'Falso',
      'Verdadero',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Para prevenir lesiones de espalda y mejorar las posturas use equipo manual para levantar o cargar (como carretilla, carreta, barra, o ganchos).',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Siempre que estén disponibles se debe usar un aparato mecánico para alzar (como montacargas, grúa y palancas) para evitar las manipulaciones manuales.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Una medida ambiental para evitar caídas, lesiones y sobre esfuerzos es tener los pasillos libres para el uso de equipo para cargar materiales, como carretas y carretillas.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: '¿Los ejercicios compensatorios son una de las maneras de prevenir las lesiones musculo esqueléticas?',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
  {
    stag: tagVERDADEROFALSO,
    title: 'Factores como el sobrepeso, fumar y la falta de ejercicio son características personales que pueden generar dolencias músculo esqueléticas.',
    options: [
      'Verdadero',
      'Falso',
    ],
  },
]

module.exports = questions
