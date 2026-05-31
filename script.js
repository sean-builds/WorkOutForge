/* ═══════════════════════════════════════════
   WORKOUTFORGE v3 — script.js
   Firebase Auth · Evidence-based programming
   Exercise instruction database
═══════════════════════════════════════════ */
'use strict';

/* ════════════════════════════════
   EXERCISE INSTRUCTION DATABASE
   ════════════════════════════════ */
const EXERCISE_DB = {
  'Push-Up': {
    id:'pushup', name:'Push-Up',
    muscles:['Chest','Triceps','Front Deltoids','Core'],
    difficulty:'Beginner', equipment:'None',
    instructions:[
      'Start in a high plank position with hands slightly wider than shoulder-width.',
      'Keep your body in a straight line from head to heels — engage your core.',
      'Slowly lower your chest toward the floor, elbows at roughly 45° from your torso.',
      'Pause when your chest is about 1–2 cm from the floor.',
      'Push through your palms to return to the start position, fully extending your arms.',
      'Repeat for the target number of reps without sagging your hips.'
    ],
    mistakes:[
      'Sagging hips — keep your core tight throughout',
      'Flaring elbows out to 90° — keep them at 45°',
      'Not going through full range of motion',
      'Holding your breath — exhale on the way up'
    ],
    safety:[
      'Stop if you feel sharp wrist or shoulder pain',
      'Beginners can start on knees to build strength',
      'Warm up wrists with circles before starting'
    ],
    sets:'3–4', reps:'8–15', rest:'60–90 s',
    videoUrl:''
  },
  'Barbell Back Squat': {
    id:'squat', name:'Barbell Back Squat',
    muscles:['Quadriceps','Glutes','Hamstrings','Core','Lower Back'],
    difficulty:'Intermediate', equipment:'Barbell, Squat Rack',
    instructions:[
      'Set the bar at upper-chest height on the rack. Step under it, resting it across your upper traps.',
      'Grip the bar slightly wider than shoulder-width, unrack and step back — feet shoulder-width, toes slightly out.',
      'Take a deep breath, brace your core and begin the descent by pushing your hips back.',
      'Lower until your thighs are at least parallel to the floor — knees tracking over toes.',
      'Drive through your heels to stand back up, squeezing your glutes at the top.',
      'Exhale as you rise. Re-rack carefully after your final rep.'
    ],
    mistakes:[
      'Knees caving inward — push them out actively',
      'Heels rising — improve ankle mobility or use a heel wedge',
      'Rounding the lower back — brace harder and reduce weight',
      'Looking straight up — keep neutral neck position'
    ],
    safety:[
      'Never squat heavy without a spotter or safety bars',
      'Learn the movement with bodyweight before loading',
      'If your lower back rounds, you have gone too deep for your current mobility'
    ],
    sets:'3–5', reps:'3–8', rest:'2–5 min',
    videoUrl:''
  },
  'Pull-Up': {
    id:'pullup', name:'Pull-Up',
    muscles:['Latissimus Dorsi','Biceps','Rhomboids','Rear Deltoids'],
    difficulty:'Intermediate', equipment:'Pull-up Bar',
    instructions:[
      'Hang from the bar with an overhand grip, hands slightly wider than shoulder-width.',
      'Let your body fully hang — this is the dead hang starting position.',
      'Depress and retract your scapula (pull your shoulder blades down and back) before pulling.',
      'Drive your elbows toward the floor as you pull your chin above the bar.',
      'Pause briefly at the top, then lower slowly and with control — 2–3 seconds down.',
      'Return to a full dead hang before the next rep.'
    ],
    mistakes:[
      'Kipping or swinging — use strict form for strength gains',
      'Not depressing scapula first — causes shoulder impingement',
      'Partial range of motion — always go to full hang',
      'Rushing the descent — the eccentric is where you build most strength'
    ],
    safety:[
      'Beginners should do negative (eccentric only) pull-ups to build strength first',
      'Stop if you feel sharp elbow or shoulder pain',
      'Use a resistance band for assistance if needed'
    ],
    sets:'3–4', reps:'5–10', rest:'2 min',
    videoUrl:''
  },
  'Plank': {
    id:'plank', name:'Plank',
    muscles:['Core','Transverse Abdominis','Shoulders','Glutes'],
    difficulty:'Beginner', equipment:'None',
    instructions:[
      'Start on your forearms with elbows directly below your shoulders.',
      'Extend your legs behind you, resting on the balls of your feet.',
      'Engage your core by pulling your navel toward your spine.',
      'Keep your body in a perfectly straight line — hips neither up nor sagging.',
      'Squeeze your glutes and breathe steadily throughout the hold.',
      'Hold for the target time, then lower with control.'
    ],
    mistakes:[
      'Hips sagging — most common mistake, ruins the exercise',
      'Hips raised too high — reduces core activation',
      'Holding your breath — breathe slowly and steadily',
      'Head dropping — maintain neutral neck alignment'
    ],
    safety:[
      'If your lower back hurts, your form has broken — stop and reset',
      'Build duration gradually — start with 20s and progress',
      'Avoid if you have acute wrist or shoulder injuries'
    ],
    sets:'3', reps:'30–60 s', rest:'60 s',
    videoUrl:''
  },
  'Lunges': {
    id:'lunges', name:'Lunges',
    muscles:['Quadriceps','Glutes','Hamstrings','Calves','Core'],
    difficulty:'Beginner', equipment:'None (or dumbbells)',
    instructions:[
      'Stand tall with feet hip-width apart and hands on hips or holding dumbbells.',
      'Step forward with one foot approximately 60–90cm ahead.',
      'Lower your back knee toward the floor, keeping your front shin vertical.',
      'Your front thigh should be parallel to the floor at the bottom.',
      'Push through your front heel to return to standing.',
      'Alternate legs or complete all reps on one side before switching.'
    ],
    mistakes:[
      'Front knee tracking past toes — shorten your stride length',
      'Torso leaning forward — keep chest up throughout',
      'Back knee slamming the floor — lower with control',
      'Looking down — keep gaze forward for balance'
    ],
    safety:[
      'Reduce range of motion if you have knee pain',
      'Hold a wall for balance when first learning',
      'Avoid heavy loading until you have perfect bodyweight form'
    ],
    sets:'3', reps:'10–12 each leg', rest:'60–90 s',
    videoUrl:''
  },
  'Deadlift': {
    id:'deadlift', name:'Deadlift',
    muscles:['Hamstrings','Glutes','Lower Back','Traps','Lats','Forearms'],
    difficulty:'Intermediate', equipment:'Barbell',
    instructions:[
      'Stand with the bar over your mid-foot, feet hip-width apart.',
      'Hinge at the hips and grip the bar just outside your legs.',
      'Lower your hips until your shins touch the bar — create tension before lifting.',
      'Take a deep breath, brace your core and drive your feet into the floor.',
      'Keep the bar in contact with your legs as it rises past your knees.',
      'Lock out at the top by squeezing glutes. Lower in reverse — controlled descent.'
    ],
    mistakes:[
      'Rounding the lower back — the most dangerous mistake',
      'Bar drifting away from legs — causes back rounding',
      'Jerking the bar — build tension first, then lift smoothly',
      'Hyperextending at lockout — stop when hips are fully open'
    ],
    safety:[
      'Master Romanian deadlift before conventional',
      'Always use a belt when lifting heavy',
      'Never deadlift with a rounded lumbar spine'
    ],
    sets:'3–5', reps:'3–6', rest:'3–5 min',
    videoUrl:''
  },
  'Overhead Press': {
    id:'ohp', name:'Overhead Press',
    muscles:['Front Deltoids','Medial Deltoids','Triceps','Upper Traps'],
    difficulty:'Intermediate', equipment:'Barbell or Dumbbells',
    instructions:[
      'Start with the bar at shoulder height on a rack, or dumbbells at shoulder level.',
      'Grip just outside shoulder width, elbows slightly in front of the bar.',
      'Brace your core and glutes — do not arch your lower back.',
      'Press the bar directly overhead, slightly back once it clears your head.',
      'Lock out fully at the top with arms straight and bar over your heels.',
      'Lower with control to starting position.'
    ],
    mistakes:[
      'Excessive lower back arch — brace harder and reduce weight',
      'Bar path too far forward — press in a slight J-curve',
      'Partial lockout — fully extend at the top for shoulder health',
      'Not engaging legs and glutes — creates a stable base'
    ],
    safety:[
      'Warm up rotator cuffs with band pull-aparts before pressing',
      'Stop if you feel sharp shoulder impingement pain',
      'Use a spotter when going for heavy PRs'
    ],
    sets:'3–5', reps:'5–10', rest:'2–3 min',
    videoUrl:''
  },
  'Barbell Bent-Over Row': {
    id:'row', name:'Barbell Bent-Over Row',
    muscles:['Lats','Rhomboids','Mid Traps','Rear Deltoids','Biceps'],
    difficulty:'Intermediate', equipment:'Barbell',
    instructions:[
      'Stand with feet shoulder-width, bar over mid-foot.',
      'Hinge forward until your torso is roughly 45° — grip the bar shoulder-width.',
      'Brace your core and keep your back flat throughout.',
      'Pull the bar into your lower sternum, driving elbows back and up.',
      'Squeeze your shoulder blades together at the top.',
      'Lower with control — do not let the bar drop or your back round.'
    ],
    mistakes:[
      'Rounding the lower back — keep neutral spine',
      'Using too much momentum — reduce weight',
      'Pulling to the chest instead of lower sternum',
      'Not squeezing at the top — reduces muscle activation'
    ],
    safety:[
      'Start light to develop the hinge pattern',
      'Consider a belt when rows get heavy',
      'Supine (underhand) grip is easier on elbows if you have discomfort'
    ],
    sets:'4', reps:'6–10', rest:'2–3 min',
    videoUrl:''
  }
};

/* Helper: look up exercise instructions by name (fuzzy match) */
function getExerciseInfo(name) {
  if (EXERCISE_DB[name]) return EXERCISE_DB[name];
  // Fuzzy fallback
  const key = Object.keys(EXERCISE_DB).find(k => name.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
  return key ? EXERCISE_DB[key] : null;
}

/* ════════════════════════════════
   GOAL PARAMS (evidence-based)
   ════════════════════════════════ */
const GOAL_PARAMS = {
  strength: { sets:5, reps:'3–5',  rest:'3–5 min', weightMult:1.00, note:'Heavy load ≈80–100% 1RM · Long rest for neural recovery (NSCA/ACSM 2026)' },
  muscle:   { sets:4, reps:'6–12', rest:'60–90 s',  weightMult:0.75, note:'Moderate load ≈67–85% 1RM · Hypertrophy sweet spot (ACSM 2026)' },
  fatloss:  { sets:3, reps:'12–15',rest:'30–60 s',  weightMult:0.55, note:'Circuit style · Short rest elevates metabolic stress (PMC 2024)' },
  general:  { sets:3, reps:'8–12', rest:'90 s',     weightMult:0.65, note:'Balanced · 3 sets · ACSM general health guidelines' },
};

/* ════════════════════════════════
   EXERCISE LIBRARY
   ════════════════════════════════ */
const WT = {
  push:[
    { name:'Barbell Bench Press',   muscle:'Chest · Triceps · Anterior Delts',  science:'95% MVC pec activation (EMG gold standard)', weights:{beginner:20,intermediate:60,advanced:100} },
    { name:'Overhead Press',        muscle:'Shoulders · Triceps · Upper Back',   science:'Top deltoid compound — NSCA recommended',     weights:{beginner:15,intermediate:40,advanced:65}  },
    { name:'Incline DB Press',      muscle:'Upper Chest · Front Delt',           science:'Greater upper-pec activation vs flat press',  weights:{beginner:10,intermediate:24,advanced:40}  },
    { name:'Cable Lateral Raise',   muscle:'Medial Deltoid',                     science:'Constant tension superior to DB raises (EMG)',weights:{beginner:5, intermediate:12,advanced:20}  },
    { name:'Tricep Rope Pushdown',  muscle:'Triceps',                            science:'Lateral head emphasis — isolation finisher',  weights:{beginner:10,intermediate:25,advanced:40}  },
    { name:'Dips',                  muscle:'Lower Chest · Triceps',              science:'High pec major activation — compound push',   weights:{beginner:0, intermediate:10,advanced:25}  },
  ],
  pull:[
    { name:'Deadlift',              muscle:'Full Back · Glutes · Hamstrings',    science:'Greatest total muscle recruitment of any lift',weights:{beginner:40,intermediate:100,advanced:160}},
    { name:'Barbell Bent-Over Row', muscle:'Lats · Mid Traps · Rear Delts',     science:'ACE Fitness top mid-back compound',           weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Pull-Up',               muscle:'Lats · Biceps · Rhomboids',          science:'Highest lat activation bodyweight exercise',  weights:{beginner:0, intermediate:10,advanced:20}  },
    { name:'Lat Pulldown',          muscle:'Lats · Lower Traps',                 science:'Equivalent to pull-up for lat EMG',            weights:{beginner:30,intermediate:60,advanced:90}  },
    { name:'Face Pulls',            muscle:'Rear Delts · Upper Traps',           science:'Top rear-delt exercise — posture & health',   weights:{beginner:10,intermediate:25,advanced:40}  },
    { name:'Barbell Bicep Curl',    muscle:'Biceps Brachii',                     science:'Full ROM critical — supination at top',        weights:{beginner:10,intermediate:25,advanced:40}  },
  ],
  legs:[
    { name:'Barbell Back Squat',    muscle:'Quads · Glutes · Hamstrings · Core', science:'74% MVC quads — most complete leg exercise',  weights:{beginner:40,intermediate:90,advanced:140} },
    { name:'Romanian Deadlift',     muscle:'Hamstrings · Glutes · Lower Back',   science:'Top hamstring exercise — hip hinge pattern',  weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Leg Press',             muscle:'Quads · Glutes',                     science:'Safe high-load alternative to squat',         weights:{beginner:60,intermediate:140,advanced:220}},
    { name:'Bulgarian Split Squat', muscle:'Quads · Glutes · Hip Stability',     science:'Best single-leg quad exercise (JSCR)',        weights:{beginner:10,intermediate:25,advanced:45}  },
    { name:'Leg Curl (Machine)',    muscle:'Hamstrings',                         science:'Seated curl: superior hamstring activation',  weights:{beginner:20,intermediate:45,advanced:70}  },
    { name:'Standing Calf Raise',   muscle:'Gastrocnemius · Soleus',             science:'Full stretch-contract ROM essential',          weights:{beginner:30,intermediate:70,advanced:110} },
  ],
  upper:[
    { name:'Barbell Bench Press',   muscle:'Chest · Triceps',                    science:'95% MVC pec activation (EMG)',                weights:{beginner:20,intermediate:60,advanced:100} },
    { name:'Barbell Bent-Over Row', muscle:'Lats · Mid Back',                   science:'ACE Fitness top mid-back compound',           weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Overhead Press',        muscle:'Shoulders · Triceps',                science:'Best deltoid compound — NSCA',                 weights:{beginner:15,intermediate:40,advanced:65}  },
    { name:'Pull-Up',               muscle:'Lats · Biceps',                      science:'Highest lat activation bodyweight',           weights:{beginner:0, intermediate:10,advanced:20}  },
    { name:'Cable Lateral Raise',   muscle:'Medial Delts',                       science:'Constant tension > DB lateral raise',         weights:{beginner:5, intermediate:12,advanced:20}  },
    { name:'Barbell Bicep Curl',    muscle:'Biceps',                             science:'Full supination ROM for peak activation',     weights:{beginner:10,intermediate:25,advanced:40}  },
  ],
  lower:[
    { name:'Barbell Back Squat',    muscle:'Quads · Glutes · Core',              science:'Most effective leg compound movement',        weights:{beginner:40,intermediate:90,advanced:140} },
    { name:'Romanian Deadlift',     muscle:'Hamstrings · Glutes',                science:'Top posterior chain exercise',                 weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Bulgarian Split Squat', muscle:'Quads · Glutes · Stability',         science:'Single-leg: corrects imbalances (JSCR)',      weights:{beginner:10,intermediate:25,advanced:45}  },
    { name:'Leg Press',             muscle:'Quads · Glutes',                     science:'High load capacity — safe overload tool',     weights:{beginner:60,intermediate:140,advanced:220}},
    { name:'Leg Curl (Machine)',    muscle:'Hamstrings',                         science:'Essential hamstring balance for knee health', weights:{beginner:20,intermediate:45,advanced:70}  },
    { name:'Standing Calf Raise',   muscle:'Calves',                             science:'Full ROM at bottom — stretch component key', weights:{beginner:30,intermediate:70,advanced:110} },
  ],
  fullbody:[
    { name:'Barbell Back Squat',    muscle:'Lower Body · Core',                  science:'Most muscle mass recruited — compound king', weights:{beginner:35,intermediate:80,advanced:130} },
    { name:'Barbell Bench Press',   muscle:'Chest · Triceps · Shoulders',        science:'95% MVC pec activation (EMG)',                weights:{beginner:20,intermediate:55,advanced:90}  },
    { name:'Deadlift',              muscle:'Full Posterior Chain',               science:'Greatest total body recruitment of any lift', weights:{beginner:40,intermediate:90,advanced:140} },
    { name:'Overhead Press',        muscle:'Shoulders · Triceps',                science:'NSCA top deltoid compound',                   weights:{beginner:15,intermediate:35,advanced:60}  },
    { name:'Barbell Bent-Over Row', muscle:'Back · Biceps',                     science:'ACE #1 back compound movement',              weights:{beginner:25,intermediate:60,advanced:95}  },
  ],
};

const CL = {
  push_beginner:[
    { name:'Push-Up',             muscle:'Chest · Triceps · Shoulders',   science:'Foundation — master form before progressing',    weights:null },
    { name:'Incline Push-ups',    muscle:'Chest · Triceps',               science:'Reduced load — ideal starting point (NSCA)',     weights:null },
    { name:'Diamond Push-ups',    muscle:'Triceps · Inner Chest',         science:'Narrow grip shifts load to triceps +30%',        weights:null },
    { name:'Pike Push-ups',       muscle:'Shoulders · Upper Chest',       science:'Mimics overhead press pattern — shoulder builder',weights:null },
  ],
  push_intermediate:[
    { name:'Push-Up',             muscle:'Chest · Triceps',               science:'Perfected form — full range of motion',          weights:null },
    { name:'Dips',                muscle:'Lower Chest · Triceps',         science:'High pec major activation — best chest dip',     weights:null },
    { name:'Archer Push-ups',     muscle:'Chest · Stability Muscles',     science:'Unilateral load — injury prevention',            weights:null },
    { name:'Pseudo-Planche Pushups',muscle:'Chest · Wrists · Core',      science:'Leaning forward increases difficulty 40%',       weights:null },
    { name:'Pike Push-ups',       muscle:'Shoulders',                     science:'Progressive toward handstand push-up',           weights:null },
  ],
  push_advanced:[
    { name:'Ring Push-ups',       muscle:'Chest · Stabilisers',           science:'Instability increases pec activation (EMG)',     weights:null },
    { name:'Handstand Push-up Neg.',muscle:'Shoulders · Triceps',         science:'Eccentric focus — superior strength gain',       weights:null },
    { name:'Archer Push-ups',     muscle:'Chest · Shoulder Stability',    science:'Single-arm progression step',                    weights:null },
    { name:'Plyometric Push-ups', muscle:'Chest · Power Output',          science:'Type II fibre activation — power development',   weights:null },
    { name:'Dips',                muscle:'Chest · Triceps',               science:'Add weight for progressive overload',            weights:null },
  ],
  pull_beginner:[
    { name:'Dead Hang',           muscle:'Grip · Lats · Shoulder Health', science:'Foundation — connective tissue conditioning',    weights:null },
    { name:'Scapular Pulls',      muscle:'Lower Traps · Rhomboids',       science:'Activates stabilisers before pull-up load',      weights:null },
    { name:'Australian Rows',     muscle:'Lats · Mid Back · Biceps',      science:'60% bodyweight load — horizontal pull',          weights:null },
    { name:'Negative Pull-ups',   muscle:'Lats · Biceps',                 science:'Eccentric only: fastest pull-up progress',       weights:null },
  ],
  pull_intermediate:[
    { name:'Pull-Up',             muscle:'Lats · Biceps · Core',          science:'Highest lat activation bodyweight exercise',     weights:null },
    { name:'Chin-ups',            muscle:'Lats · Biceps (peak)',           science:'Supinated grip: +30% bicep recruitment (EMG)',  weights:null },
    { name:'Australian Rows',     muscle:'Mid Back · Rear Delts',         science:'Horizontal pull — balances vertical plane',      weights:null },
    { name:'Commando Pull-ups',   muscle:'Lats · Biceps · Forearms',      science:'Neutral grip — easier on wrists and elbows',     weights:null },
  ],
  pull_advanced:[
    { name:'Pull-Up',             muscle:'Lats · Biceps',                 science:'Progressive overload principle — ACSM',          weights:null },
    { name:'Archer Pull-ups',     muscle:'Lats · Unilateral Strength',    science:'Single-arm progression step',                    weights:null },
    { name:'L-sit Pull-ups',      muscle:'Lats · Core · Hip Flexors',     science:'Compound difficulty — advanced skill work',      weights:null },
    { name:'Typewriter Pull-ups', muscle:'Lats · Rhomboids',              science:'Lateral movement: new muscle angles',            weights:null },
  ],
  legs_beginner:[
    { name:'Lunges',              muscle:'Quads · Glutes · Balance',      science:'Unilateral — functional movement pattern',       weights:null },
    { name:'Bodyweight Squats',   muscle:'Quads · Glutes · Hamstrings',   science:'Master squat pattern before loading',            weights:null },
    { name:'Glute Bridges',       muscle:'Glutes · Hamstrings',           science:'Hip extension — glute activation foundation',    weights:null },
    { name:'Step-ups',            muscle:'Quads · Glutes',                science:'Controlled load — knee-friendly progression',    weights:null },
    { name:'Plank',               muscle:'Core · Shoulders',              science:'Anti-extension core — spinal stability',         weights:null },
  ],
  legs_intermediate:[
    { name:'Bulgarian Split Squat',muscle:'Quads · Glutes · Stability',   science:'Best single-leg exercise (JSCR)',               weights:null },
    { name:'Jump Squats',         muscle:'Quads · Glutes · Power',        science:'Type II fast-twitch activation',                 weights:null },
    { name:'Nordic Hamstring Curl',muscle:'Hamstrings',                   science:'40% injury reduction in athletes (BMJ 2019)',    weights:null },
    { name:'Lateral Lunges',      muscle:'Adductors · Quads · Glutes',    science:'Frontal plane — neglected in most programmes',   weights:null },
    { name:'Plank',               muscle:'Core · Shoulders',              science:'Anti-extension — spinal neutral hold',           weights:null },
  ],
  legs_advanced:[
    { name:'Pistol Squat',        muscle:'Quads · Glutes · Balance',      science:'Max unilateral quad strength assessment',        weights:null },
    { name:'Jump Lunges',         muscle:'Quads · Power · Glutes',        science:'Plyometric — Type II fast-twitch stress',        weights:null },
    { name:'Nordic Hamstring Curl',muscle:'Hamstrings',                   science:'Gold standard hamstring eccentric exercise',     weights:null },
    { name:'Shrimp Squat',        muscle:'Quads · Glutes',                science:'Rear-foot elevated single-leg variation',        weights:null },
    { name:'Dragon Flag',         muscle:'Full Core',                     science:'Elite core strength — advanced progression',     weights:null },
  ],
  fullbody_beginner:[
    { name:'Push-Up',             muscle:'Chest · Triceps',               science:'Foundation of calisthenics upper push',          weights:null },
    { name:'Australian Rows',     muscle:'Back · Biceps',                  science:'Horizontal pull — beginner back exercise',       weights:null },
    { name:'Bodyweight Squats',   muscle:'Legs · Glutes',                  science:'Squat pattern — most important lower movement',  weights:null },
    { name:'Glute Bridges',       muscle:'Glutes · Hamstrings',           science:'Hip hinge foundation',                           weights:null },
    { name:'Plank',               muscle:'Core · Shoulders',              science:'Anti-extension core — spinal stability',         weights:null },
  ],
  fullbody_intermediate:[
    { name:'Push-Up',             muscle:'Chest · Triceps',               science:'Master variation before progressing',            weights:null },
    { name:'Pull-Up',             muscle:'Lats · Biceps',                 science:'Highest lat activation — bodyweight',            weights:null },
    { name:'Bulgarian Split Squat',muscle:'Quads · Glutes',               science:'Best unilateral leg exercise (JSCR)',            weights:null },
    { name:'Dips',                muscle:'Chest · Triceps',               science:'Compound push — chest and tricep emphasis',      weights:null },
    { name:'Plank',               muscle:'Core · Hip Flexors',            science:'Anti-extension — elite core standard',           weights:null },
  ],
  fullbody_advanced:[
    { name:'Ring Push-ups',       muscle:'Chest · Stabilisers',           science:'Instability +20% pec activation (EMG)',          weights:null },
    { name:'Pull-Up',             muscle:'Lats · Biceps',                 science:'Add weight for progressive overload',            weights:null },
    { name:'Pistol Squat',        muscle:'Quads · Balance',               science:'Full unilateral lower body assessment',          weights:null },
    { name:'Dips',                muscle:'Chest · Triceps',               science:'Load adds size — overload principle',            weights:null },
    { name:'Dragon Flag',         muscle:'Full Core',                     science:'Bruce Lee exercise — elite core strength',       weights:null },
  ],
};

const YOGA = {
  mobility:[
    { name:'Sun Salutation A (×5)', muscle:'Full Body Warm-up',          science:'Dynamic flow — raises core temp, improves ROM',  weights:null },
    { name:'Cat-Cow Flow',          muscle:'Spine · Core',               science:'Spinal mobility — reduces lower back stiffness', weights:null },
    { name:'Hip Flexor Lunge Stretch',muscle:'Hip Flexors · Quads',      science:'Counters sitting posture — hip extension',       weights:null },
    { name:"Child's Pose",          muscle:'Lower Back · Hips · Lats',   science:'Passive stretch — parasympathetic activation',   weights:null },
  ],
  flexibility:[
    { name:'Seated Forward Fold',   muscle:'Hamstrings · Lower Back',    science:'Hold 60s — long-duration gains flexibility',     weights:null },
    { name:'Pigeon Pose',           muscle:'Hip Rotators · Glutes',      science:'Most effective hip opener — 90s each side',      weights:null },
    { name:'Supine Twist',          muscle:'Spine · IT Band · Glutes',   science:'Spinal rotation — nerve tension relief',         weights:null },
    { name:'Lizard Pose',           muscle:'Hip Flexors · Groin',        science:'Deep hip extension stretch — runners essential', weights:null },
  ],
  balance:[
    { name:'Tree Pose',             muscle:'Standing Leg · Core',        science:'Proprioception training — reduces fall risk',    weights:null },
    { name:'Warrior III',           muscle:'Glutes · Core · Balance',    science:'Single-leg hip extension — functional strength', weights:null },
    { name:'Eagle Pose',            muscle:'Hips · Shoulders · Balance', science:'Cross-body coordination — neural challenge',     weights:null },
    { name:'Half Moon Pose',        muscle:'Core · Outer Hip · Balance', science:'Lateral stability — glute med activation',      weights:null },
  ],
  recovery:[
    { name:'Legs Up the Wall',      muscle:'Hamstrings · Lower Back',    science:'Lymphatic drainage — reduces leg fatigue',       weights:null },
    { name:'Supine Twist (2 min)',  muscle:'Spine · Glutes',             science:'Parasympathetic — lowers cortisol post-workout', weights:null },
    { name:'Savasana',              muscle:'Full Body Rest',             science:'Consolidates neural adaptations from session',   weights:null },
  ],
};

const PIL = {
  core:[
    { name:'The Hundred',           muscle:'Core · Breathing',           science:'Classic Pilates — diaphragmatic engagement',     weights:null },
    { name:'Roll-Up',               muscle:'Abdominals · Spine',         science:'Spinal flexion control — full range',            weights:null },
    { name:'Double Leg Stretch',    muscle:'Core · Hip Flexors',         science:'Lengthening + compression — dual core demand',   weights:null },
    { name:'Criss-Cross',           muscle:'Obliques · Core',            science:'Rotational core — sports transfer',              weights:null },
    { name:'Plank',                 muscle:'Core · Shoulders',           science:'Anti-extension — spinal neutral hold',           weights:null },
  ],
  stability:[
    { name:'Single Leg Circles',    muscle:'Hip Stability · Core',       science:'Joint centration — hip socket health',           weights:null },
    { name:'Bird Dog',              muscle:'Core · Glutes · Lower Back', science:'McGill Big 3 — spine-sparing exercise',          weights:null },
    { name:'Clam Shell',            muscle:'Hip External Rotators',      science:'Activates glute med — underused stabiliser',     weights:null },
    { name:'Dead Bug',              muscle:'Core · Anti-Rotation',       science:'McGill recommended — neutral spine stability',   weights:null },
  ],
  flexibility:[
    { name:'Spine Stretch Forward', muscle:'Hamstrings · Spine',         science:'Active elongation — not passive collapse',       weights:null },
    { name:'Swan Dive Prep',        muscle:'Spinal Extensors · Glutes',  science:'Back extension — posture correction essential',  weights:null },
    { name:'Mermaid Stretch',       muscle:'Lateral Spine · Obliques',   science:'Lateral chain — IT band and QL relief',          weights:null },
  ],
  recovery:[
    { name:'Constructive Rest',     muscle:'Psoas Release · Lower Back', science:'Gravity-assisted psoas release — 5 min',         weights:null },
    { name:'Pelvic Clock',          muscle:'Lumbar Stability · Core',    science:'Neuromuscular — maps pelvic neutral position',   weights:null },
    { name:'Lateral Breathing',     muscle:'Diaphragm · Intercostals',   science:'Pilates breath — rib cage expansion technique', weights:null },
  ],
};

const HIIT = {
  circuit:[
    { name:'Burpees',               muscle:'Full Body · Cardio',         science:'Max calorie burn — 12–15 kcal/min (ACE study)',  weights:null },
    { name:'Jump Squats',           muscle:'Quads · Glutes · Power',     science:'Type II fast-twitch — plyometric adaptation',    weights:null },
    { name:'Push-Up',               muscle:'Chest · Triceps',            science:'Upper body push — maintains muscle in deficit',  weights:null },
    { name:'Mountain Climbers',     muscle:'Core · Cardio · Shoulders',  science:'Dynamic core — elevates heart rate rapidly',     weights:null },
    { name:'High Knees',            muscle:'Hip Flexors · Cardio',       science:'Sprint mechanics — improves running economy',    weights:null },
    { name:'Plank',                 muscle:'Core',                       science:'Active rest between intense intervals',           weights:null },
  ],
};

const CARDIO_SESSIONS = [
  { name:'Steady State Run',        muscle:'Cardiovascular System · Legs',science:'Zone 2 cardio — mitochondrial biogenesis',      weights:null },
  { name:'Cycling Intervals',       muscle:'Legs · Cardiovascular',      science:'HIIT cycling: superior fat oxidation (JSCR)',    weights:null },
  { name:'Rowing Machine',          muscle:'Full Body · Cardiovascular',  science:'Full body — burns 600–800 kcal/hr (ACE)',       weights:null },
  { name:'Jump Rope',               muscle:'Calves · Cardio · Coordination',science:'10 min = 30 min jogging — efficiency king',  weights:null },
];

/* ════════════════════════════════
   SCHEDULE LOGIC
   ════════════════════════════════ */
const ALL_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const FREQ_MAP = {
  beginner:     { easy:3, balanced:4, fast:5 },
  intermediate: { easy:4, balanced:5, fast:6 },
  advanced:     { easy:5, balanced:6, fast:6 },
};
const DAY_TEMPLATES = { 3:['Mon','Wed','Fri'], 4:['Mon','Tue','Thu','Fri'], 5:['Mon','Tue','Wed','Fri','Sat'], 6:['Mon','Tue','Wed','Thu','Fri','Sat'] };

function getRecommendedDays(exp, intensity) {
  return DAY_TEMPLATES[FREQ_MAP[exp][intensity]] || DAY_TEMPLATES[3];
}

function generateWeeklyPlan(profile, styles, goal, workoutDays) {
  const plan = {};
  ALL_DAYS.forEach(d => {
    plan[d] = workoutDays.includes(d)
      ? buildDayWorkout(styles, goal, profile.experience, workoutDays.length, workoutDays.indexOf(d))
      : { type:'rest', name:'Rest Day', exercises:[], scienceNote:'Active recovery — muscles rebuild during rest (ACSM)' };
  });
  return plan;
}

function buildDayWorkout(styles, goal, experience, freq, dayIndex) {
  const p = GOAL_PARAMS[goal];
  const primaryStyle = Array.isArray(styles) ? styles[dayIndex % styles.length] : styles;
  let exercises = [], sessionName = '', scienceNote = p.note;

  if (primaryStyle === 'weights') {
    let key;
    if (freq <= 3) { key='fullbody'; sessionName='Full Body'; }
    else if (freq === 4) { key=['upper','lower','upper','lower'][dayIndex%4]; sessionName=key==='upper'?'Upper Body':'Lower Body'; }
    else { key=['push','pull','legs','push','pull','legs'][dayIndex%3]; sessionName=key.charAt(0).toUpperCase()+key.slice(1)+' Day'; }
    exercises = WT[key].map(ex => ({ ...ex, sets:p.sets, reps:p.reps, rest:p.rest, weight: ex.weights ? Math.round(ex.weights[experience]*p.weightMult) : null }));

  } else if (primaryStyle === 'calisthenics') {
    const splits = freq<=3 ? ['fullbody','fullbody','fullbody'] : ['push','pull','legs','fullbody','push','pull'];
    const split = splits[dayIndex%splits.length];
    const base = CL[`${split}_${experience}`] || CL[`${split}_beginner`];
    sessionName = split.charAt(0).toUpperCase()+split.slice(1);
    exercises = base.map(ex => ({ ...ex, sets:p.sets, reps:p.reps, rest:p.rest, weight:null }));

  } else if (primaryStyle === 'yoga') {
    const sessions = [{key:'mobility',name:'Mobility Flow'},{key:'flexibility',name:'Flexibility'},{key:'balance',name:'Balance'},{key:'recovery',name:'Recovery'}];
    const s = sessions[dayIndex%sessions.length];
    sessionName = s.name;
    exercises = YOGA[s.key].map(ex => ({ ...ex, sets:2, reps:'Hold as instructed', rest:'Breathe', weight:null }));

  } else if (primaryStyle === 'pilates') {
    const sessions = [{key:'core',name:'Core Power'},{key:'stability',name:'Stability'},{key:'flexibility',name:'Flexibility'},{key:'recovery',name:'Recovery'}];
    const s = sessions[dayIndex%sessions.length];
    sessionName = s.name;
    exercises = PIL[s.key].map(ex => ({ ...ex, sets:3, reps:'10 / as noted', rest:'30 s', weight:null }));

  } else if (primaryStyle === 'hiit') {
    sessionName = 'HIIT Circuit';
    exercises = HIIT.circuit.map(ex => ({ ...ex, sets:3, reps:'40s on / 20s off', rest:'60 s', weight:null }));

  } else if (primaryStyle === 'cardio') {
    const s = CARDIO_SESSIONS[dayIndex%CARDIO_SESSIONS.length];
    sessionName = s.name;
    exercises = [{ ...s, sets:1, reps:'30–45 min', rest:'—', weight:null }];
  }

  return { type:'workout', name:sessionName, exercises, scienceNote };
}

/* ════════════════════════════════
   STATE
   ════════════════════════════════ */
const State = {
  uid:null, displayName:null, accountType:null,
  profile:null, styles:[], goal:null,
  scheduleMode:null, intensity:null, workoutDays:[],
  weeklyPlan:null, completedDates:[], setStates:{}, weights:{},
  reminderTime:null, theme:'dark', notifAsked:false,
};

function saveLocal() {
  try { localStorage.setItem('wf_v3', JSON.stringify(State)); } catch(e) {}
}
function loadLocal() {
  try {
    const raw = localStorage.getItem('wf_v3');
    if (raw) Object.assign(State, JSON.parse(raw));
  } catch(e) {}
}

async function saveToFirestore() {
  const fb = window._firebase;
  if (!fb || !State.uid || State.accountType==='guest') return;
  try {
    await fb.setDoc(fb.doc(fb.db,'users',State.uid), {
      displayName:State.displayName, profile:State.profile,
      styles:State.styles, goal:State.goal,
      scheduleMode:State.scheduleMode, intensity:State.intensity,
      workoutDays:State.workoutDays, weeklyPlan:State.weeklyPlan,
      completedDates:State.completedDates, setStates:State.setStates,
      weights:State.weights, reminderTime:State.reminderTime,
      theme:State.theme, notifAsked:State.notifAsked,
      updatedAt: new Date().toISOString()
    }, { merge:true });
  } catch(e) { console.warn('Firestore save failed:', e); }
}

async function loadFromFirestore(uid) {
  const fb = window._firebase;
  if (!fb) return false;
  try {
    const snap = await fb.getDoc(fb.doc(fb.db,'users',uid));
    if (snap.exists()) { Object.assign(State, snap.data()); State.uid = uid; return true; }
  } catch(e) { console.warn('Firestore load failed:', e); }
  return false;
}

function saveState() { saveLocal(); saveToFirestore(); }

/* ════════════════════════════════
   HELPERS
   ════════════════════════════════ */
function today()    { return new Date().toISOString().split('T')[0]; }
function todayDay() { return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()]; }
function greeting(name) {
  const h = new Date().getHours();
  const g = h<12?'Good morning':h<17?'Good afternoon':'Good evening';
  return name ? `${g}, ${name}` : g;
}
function getWeekDates() {
  const now=new Date(), day=now.getDay(), mon=new Date(now);
  mon.setDate(now.getDate()-((day+6)%7));
  return ALL_DAYS.map((_,i)=>{ const d=new Date(mon); d.setDate(mon.getDate()+i); return d.toISOString().split('T')[0]; });
}
function calcStreak() {
  if (!State.completedDates.length) return 0;
  const sorted=[...new Set(State.completedDates)].sort().reverse();
  let streak=0, check=new Date();
  for (const d of sorted) {
    if (Math.round((check-new Date(d))/86400000)<=1) { streak++; check=new Date(d); } else break;
  }
  return streak;
}
function calcWeekPct() {
  const wk=getWeekDates(), done=wk.filter(d=>State.completedDates.includes(d)).length;
  return State.workoutDays.length ? Math.round((done/State.workoutDays.length)*100) : 0;
}
function showError(el, msg) { el.textContent=msg; el.classList.remove('hidden'); el.scrollIntoView({behavior:'smooth',block:'nearest'}); }
function applyTheme(t) { document.body.dataset.theme = t||'dark'; }
function showToast(msg) {
  const t=document.getElementById('toast');
  if (!t) return;
  t.textContent=msg; t.classList.remove('hidden');
  setTimeout(()=>t.classList.add('hidden'), 2800);
}

/* ════════════════════════════════
   AUTH MODULE
   ════════════════════════════════ */
const Auth = {
  _confirmationResult: null,
  _pendingUser: null,

  showTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p=>p.classList.add('hidden'));
    document.getElementById('tab-'+tab).classList.add('active');
    document.getElementById('panel-'+tab).classList.remove('hidden');
  },

  showForgotPassword() {
    document.querySelectorAll('.auth-panel').forEach(p=>p.classList.add('hidden'));
    document.getElementById('panel-forgot').classList.remove('hidden');
  },

  async googleSignIn() {
    const fb = window._firebase;
    if (!fb) return alert('Firebase not configured yet. See firebase-setup.md');
    try {
      const provider = new fb.GoogleAuthProvider();
      const result = await fb.signInWithPopup(fb.auth, provider);
      Auth._handleSignedInUser(result.user, 'google');
    } catch(e) { alert('Google sign-in failed: ' + e.message); }
  },

  async emailSignIn() {
    const fb = window._firebase;
    if (!fb) return alert('Firebase not configured. See firebase-setup.md');
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-pass').value;
    const errEl = document.getElementById('login-error');
    if (!email||!pass) return showError(errEl,'Please enter email and password.');
    try {
      const cred = await fb.signInWithEmailAndPassword(fb.auth, email, pass);
      if (!cred.user.emailVerified) {
        Auth._pendingUser = cred.user;
        Auth._showVerifyScreen(email);
        return;
      }
      Auth._handleSignedInUser(cred.user, 'email');
    } catch(e) {
      const msgs = { 'auth/user-not-found':'No account with that email.', 'auth/wrong-password':'Incorrect password.', 'auth/invalid-email':'Please enter a valid email.' };
      showError(errEl, msgs[e.code] || e.message);
    }
  },

  async emailSignUp() {
    const fb = window._firebase;
    if (!fb) return alert('Firebase not configured. See firebase-setup.md');
    const email   = document.getElementById('signup-email').value.trim();
    const pass    = document.getElementById('signup-pass').value;
    const confirm = document.getElementById('signup-confirm').value;
    const errEl   = document.getElementById('signup-error');
    if (!email||!pass||!confirm) return showError(errEl,'Please fill in all fields.');
    if (!email.includes('@'))    return showError(errEl,'Please enter a valid email.');
    if (pass.length < 8)         return showError(errEl,'Password must be at least 8 characters.');
    if (pass !== confirm)        return showError(errEl,'Passwords do not match.');
    try {
      const cred = await fb.createUserWithEmailAndPassword(fb.auth, email, pass);
      await fb.sendEmailVerification(cred.user);
      Auth._pendingUser = cred.user;
      Auth._showVerifyScreen(email);
    } catch(e) {
      const msgs = { 'auth/email-already-in-use':'An account with this email already exists.', 'auth/invalid-email':'Please enter a valid email.', 'auth/weak-password':'Password is too weak.' };
      showError(errEl, msgs[e.code] || e.message);
    }
  },

  async sendPasswordReset() {
    const fb = window._firebase;
    if (!fb) return alert('Firebase not configured.');
    const email = document.getElementById('forgot-email').value.trim();
    const errEl = document.getElementById('forgot-error');
    const sucEl = document.getElementById('forgot-success');
    if (!email) return showError(errEl,'Please enter your email.');
    try {
      await fb.sendPasswordResetEmail(fb.auth, email);
      errEl.classList.add('hidden');
      sucEl.textContent='Reset email sent! Check your inbox.';
      sucEl.classList.remove('hidden');
    } catch(e) {
      showError(errEl, e.code==='auth/user-not-found' ? 'No account with that email.' : e.message);
    }
  },

  async resendVerification() {
    const fb = window._firebase;
    if (!fb||!Auth._pendingUser) return;
    try { await fb.sendEmailVerification(Auth._pendingUser); showToast('Verification email sent!'); }
    catch(e) { showToast('Could not resend: '+e.message); }
  },

  phoneSignIn() {
    document.querySelectorAll('.auth-panel').forEach(p=>p.classList.add('hidden'));
    document.getElementById('panel-phone').classList.remove('hidden');
    Auth._initRecaptcha();
  },

  _initRecaptcha() {
    const fb = window._firebase;
    if (!fb||Auth._recaptcha) return;
    try {
      Auth._recaptcha = new fb.RecaptchaVerifier(fb.auth,'recaptcha-container',{ size:'invisible' });
    } catch(e) { console.warn('reCAPTCHA init failed:', e); }
  },

  async sendSMS() {
    const fb = window._firebase;
    if (!fb) return alert('Firebase not configured.');
    const phone = document.getElementById('phone-number').value.trim();
    const errEl = document.getElementById('phone-error');
    if (!phone) return showError(errEl,'Please enter your phone number.');
    if (!phone.startsWith('+')) return showError(errEl,'Include country code, e.g. +1 555 000 0000');
    try {
      Auth._confirmationResult = await fb.signInWithPhoneNumber(fb.auth, phone, Auth._recaptcha);
      document.getElementById('phone-step-1').classList.add('hidden');
      document.getElementById('phone-step-2').classList.remove('hidden');
    } catch(e) {
      showError(errEl, e.code==='auth/invalid-phone-number' ? 'Invalid phone number. Include country code.' : e.message);
    }
  },

  async verifySMS() {
    const code  = document.getElementById('sms-code').value.trim();
    const errEl = document.getElementById('sms-error');
    if (!code||code.length!==6) return showError(errEl,'Please enter the 6-digit code.');
    try {
      const result = await Auth._confirmationResult.confirm(code);
      Auth._handleSignedInUser(result.user, 'phone');
    } catch(e) {
      showError(errEl, e.code==='auth/invalid-verification-code' ? 'Incorrect code. Please try again.' : e.message);
    }
  },

  resetPhone() {
    document.getElementById('phone-step-1').classList.remove('hidden');
    document.getElementById('phone-step-2').classList.add('hidden');
    Auth._recaptcha = null;
    Auth._initRecaptcha();
  },

  async guestSignIn() {
    const fb = window._firebase;
    if (!fb) return alert('Firebase not configured. See firebase-setup.md');
    try {
      const cred = await fb.signInAnonymously(fb.auth);
      Auth._handleSignedInUser(cred.user, 'guest');
    } catch(e) { alert('Guest sign-in failed: '+e.message); }
  },

  async _handleSignedInUser(user, method) {
    State.uid         = user.uid;
    State.accountType = method;
    State.displayName = user.displayName || '';

    // Try to load data from Firestore first
    const loaded = await loadFromFirestore(user.uid);
    if (!loaded) loadLocal();

    applyTheme(State.theme);

    // If we don't have a display name, ask for one
    if (!State.displayName) {
      App.go('name');
    } else if (!State.weeklyPlan) {
      App.go('profile');
    } else {
      App.go('dashboard');
      if (!State.notifAsked) setTimeout(()=>App.go('notif-prompt'), 600);
    }
  },

  _showVerifyScreen(email) {
    document.querySelectorAll('.auth-panel').forEach(p=>p.classList.add('hidden'));
    document.getElementById('verify-email-display').textContent = email;
    document.getElementById('panel-verify').classList.remove('hidden');
  },

  async doSignOut() {
    if (!confirm('Sign out?')) return;
    const fb = window._firebase;
    if (fb) { try { await fb.signOut(fb.auth); } catch(e) {} }
    Object.assign(State, {
      uid:null, displayName:null, accountType:null,
      profile:null, styles:[], goal:null,
      weeklyPlan:null, completedDates:[], setStates:{}, weights:{},
    });
    saveLocal();
    App.go('auth');
  },
};

/* ════════════════════════════════
   MAIN APP
   ════════════════════════════════ */
const App = {
  currentWorkout:null,
  _previewDay:null,
  _exerciseDetailFrom:null,

  onAuthStateChanged(user) {
    // Called by Firebase onAuthStateChanged observer
    if (user && !State.uid) {
      // Returning user — auto sign in
      Auth._handleSignedInUser(user, user.isAnonymous ? 'guest' : 'email');
    } else if (!user) {
      App.go('auth');
    }
  },

  init() {
    loadLocal();
    applyTheme(State.theme);
    // If firebase isn't loaded yet, show auth after a moment
    // onAuthStateChanged will handle routing once Firebase loads
    setTimeout(()=>{
      if (!window._firebase) {
        // Firebase not configured — show a config warning but still allow local use
        App.go('auth');
      }
    }, 2000);
  },

  go(screen) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById('screen-'+screen);
    if (el) el.classList.add('active');
    if (screen==='dashboard')    App.renderDashboard();
    if (screen==='settings')     App.renderSettings();
    if (screen==='edit-profile') App.populateEditProfile();
  },

  /* ── NAME ── */
  async saveName() {
    const val = document.getElementById('display-name').value.trim();
    const errEl = document.getElementById('name-error');
    if (!val) return showError(errEl,'Please enter your name.');
    if (val.length > 30) return showError(errEl,'Name must be 30 characters or fewer.');
    State.displayName = val;
    saveState();
    // Also update Firebase display name
    const fb = window._firebase;
    if (fb && fb.auth.currentUser) {
      try { await fb.updateProfile(fb.auth.currentUser, { displayName:val }); } catch(e) {}
    }
    if (!State.weeklyPlan) App.go('profile'); else App.go('dashboard');
  },

  /* ── PILLS & CARDS ── */
  selectPill(btn, groupId) {
    document.querySelectorAll('#'+groupId+' .pill').forEach(p=>p.classList.remove('selected'));
    btn.classList.add('selected');
    if (groupId==='intensity-group') App.previewRecommended();
  },

  selectCard(btn, groupId) {
    document.querySelectorAll('#'+groupId+' .goal-card').forEach(c=>c.classList.remove('selected'));
    btn.classList.add('selected');
  },

  toggleMultiCard(btn) {
    btn.classList.toggle('selected');
  },

  /* ── PROFILE ── */
  submitProfile() {
    const age    = parseInt(document.getElementById('p-age').value);
    const weight = parseFloat(document.getElementById('p-weight').value);
    const height = parseFloat(document.getElementById('p-height').value);
    const gender = document.getElementById('p-gender').value;
    const expBtn = document.querySelector('#p-experience .pill.selected');
    const errEl  = document.getElementById('profile-error');
    if (!age||age<13||age>99) return showError(errEl,'Please enter a valid age (13–99).');
    if (!weight||weight<30)   return showError(errEl,'Please enter a valid weight.');
    if (!height||height<100)  return showError(errEl,'Please enter a valid height.');
    if (!gender)              return showError(errEl,'Please select a gender.');
    if (!expBtn)              return showError(errEl,'Please select your experience level.');
    errEl.classList.add('hidden');
    State.profile = { age, weight, height, gender, experience:expBtn.dataset.val };
    saveState(); App.go('style');
  },

  submitStyle() {
    const selected = [...document.querySelectorAll('#style-cards .multi-card.selected')].map(b=>b.dataset.val);
    const errEl = document.getElementById('style-error');
    if (!selected.length) return showError(errEl,'Please select at least one training style.');
    errEl.classList.add('hidden');
    State.styles = selected;
    saveState(); App.go('goal');
  },

  submitGoal() {
    const sel  = document.querySelector('#goal-cards .goal-card.selected');
    const errEl = document.getElementById('goal-error');
    if (!sel) return showError(errEl,'Please select a goal.');
    errEl.classList.add('hidden');
    State.goal = sel.dataset.val;
    saveState(); App.go('schedule');
  },

  /* ── SCHEDULE ── */
  showRecommended() {
    document.getElementById('btn-recommended').classList.add('active');
    document.getElementById('btn-custom').classList.remove('active');
    document.getElementById('recommended-section').classList.remove('hidden');
    document.getElementById('custom-section').classList.add('hidden');
    State.scheduleMode='recommended';
  },
  showCustom() {
    document.getElementById('btn-custom').classList.add('active');
    document.getElementById('btn-recommended').classList.remove('active');
    document.getElementById('custom-section').classList.remove('hidden');
    document.getElementById('recommended-section').classList.add('hidden');
    State.scheduleMode='custom';
  },
  previewRecommended() {
    const intBtn = document.querySelector('#intensity-group .pill.selected');
    if (!intBtn||!State.profile) return;
    const days = getRecommendedDays(State.profile.experience, intBtn.dataset.val);
    const prev = document.getElementById('recommended-preview');
    prev.classList.remove('hidden');
    prev.innerHTML = '<div class="preview-days">'+ALL_DAYS.map(d=>'<span class="preview-day '+(days.includes(d)?'workout':'rest')+'">'+d+'</span>').join('')+'</div>'+
      '<p style="font-size:11px;color:var(--text2);margin-top:8px">'+days.length+' days/week — ACSM frequency guidelines</p>';
  },
  toggleDay(btn) { btn.classList.toggle('selected'); },

  submitSchedule() {
    const errEl = document.getElementById('schedule-error');
    if (!State.scheduleMode) return showError(errEl,'Please choose a schedule type.');
    let workoutDays=[];
    if (State.scheduleMode==='recommended') {
      const intBtn = document.querySelector('#intensity-group .pill.selected');
      if (!intBtn) return showError(errEl,'Please select a training intensity.');
      State.intensity = intBtn.dataset.val;
      workoutDays = getRecommendedDays(State.profile.experience, State.intensity);
    } else {
      workoutDays = [...document.querySelectorAll('#days-grid .day-btn.selected')].map(b=>b.dataset.day);
      if (workoutDays.length<2) return showError(errEl,'Please select at least 2 days.');
    }
    errEl.classList.add('hidden');
    State.workoutDays = workoutDays;
    State.weeklyPlan  = generateWeeklyPlan(State.profile, State.styles, State.goal, workoutDays);
    saveState();
    if (!State.notifAsked) App.go('notif-prompt'); else App.go('dashboard');
  },

  /* ── NOTIFICATIONS ── */
  async requestNotifPermission() {
    State.notifAsked = true; saveState();
    if (!('Notification' in window)) { alert('Notifications not supported.'); App.go('dashboard'); return; }
    const perm = await Notification.requestPermission();
    if (perm==='granted') App.go('notifications'); else App.go('dashboard');
  },
  skipNotif() { State.notifAsked=true; saveState(); App.go('dashboard'); },

  /* ── DASHBOARD ── */
  renderDashboard() {
    if (!State.weeklyPlan||!document.getElementById('stat-streak')) return;
    const dayKey  = todayDay();
    const dayData = State.weeklyPlan[dayKey];

    document.getElementById('dash-greeting').textContent = greeting(State.displayName);
    document.getElementById('dash-name').textContent = State.displayName
      ? State.displayName+"'s Dashboard" : 'Your Dashboard';
    document.getElementById('stat-streak').textContent = calcStreak();
    document.getElementById('stat-total').textContent  = [...new Set(State.completedDates)].length;
    document.getElementById('stat-week').textContent   = calcWeekPct()+'%';

    const tag=document.getElementById('today-tag'), name=document.getElementById('today-name');
    const exEl=document.getElementById('today-exercises'), card=document.getElementById('today-card');

    if (!dayData||dayData.type==='rest') {
      tag.textContent='Rest Day'; name.textContent='Recovery';
      exEl.textContent=dayData?dayData.scienceNote:'Take it easy today 💤';
      card.onclick=null; document.getElementById('today-arrow').style.display='none';
    } else {
      tag.textContent=dayKey; name.textContent=dayData.name;
      exEl.textContent=dayData.exercises.slice(0,4).map(e=>e.name).join(' · ')+(dayData.exercises.length>4?' +more':'');
      card.onclick=()=>App.openWorkout(dayKey,dayData);
      document.getElementById('today-arrow').style.display='block';
    }

    const weekDates=getWeekDates();
    document.getElementById('week-cards').innerHTML = ALL_DAYS.map((d,i)=>{
      const plan=State.weeklyPlan[d], date=weekDates[i];
      const isToday=d===dayKey, isDone=State.completedDates.includes(date), isWork=plan&&plan.type==='workout';
      const cls='week-card'+(isToday?' today':isDone?' done':isWork?' workout-day':'');
      const icon=isDone?'✅':isWork?'💪':'😴';
      const label=isWork&&plan?plan.name.split(' ')[0]:'Rest';
      return '<div class="'+cls+'" onclick="App.previewDay(\''+d+'\')" role="button" tabindex="0">'+
        '<div class="week-card-name">'+d+'</div><div class="week-card-icon">'+icon+'</div>'+
        '<div class="week-card-label">'+label+'</div></div>';
    }).join('');
  },

  /* ── DAY PREVIEW ── */
  previewDay(dayKey) {
    if (!State.weeklyPlan) return;
    const dayData = State.weeklyPlan[dayKey];
    App._previewDay = { dayKey, dayData };
    document.getElementById('preview-day-tag').textContent  = dayKey;
    document.getElementById('preview-day-name').textContent = dayData.name;
    document.getElementById('preview-day-meta').textContent = dayData.scienceNote||'';
    const startBtn = document.getElementById('preview-start-btn');
    const list     = document.getElementById('preview-exercise-list');

    if (!dayData||dayData.type==='rest') {
      startBtn.style.display='none';
      list.innerHTML='<div style="text-align:center;padding:40px 0;color:var(--text2)">😴<br/><br/>Rest day — muscles rebuild during recovery.<br/>Try a walk, stretch, or yoga session.</div>';
    } else {
      startBtn.style.display='block';
      startBtn.textContent='Start '+dayData.name+' →';
      list.innerHTML = dayData.exercises.map(ex=>{
        const hasInfo = !!getExerciseInfo(ex.name);
        return '<div class="preview-ex-item">'+
          '<div class="preview-ex-name'+(hasInfo?' clickable":onclick="App.openExerciseDetail(\''+encodeURIComponent(ex.name)+'\')"':'":')+'">'+
            ex.name+(hasInfo?' <span class="ex-info-badge">ℹ️</span>':'')+'</div>'+
          '<div class="preview-ex-meta">'+ex.sets+' sets · '+ex.reps+' reps · Rest '+ex.rest+'</div>'+
          '<div class="preview-ex-meta" style="margin-top:2px">'+( ex.muscle||'')+'</div>'+
          '<div class="preview-ex-science">'+(ex.science||'')+'</div>'+
          (ex.weight!==null?'<div style="font-size:12px;color:var(--accent);margin-top:4px">Suggested: '+ex.weight+'kg</div>':'')+
          '</div>';
      }).join('');
    }
    App.go('day-preview');
  },

  startPreviewWorkout() {
    const cur = App._previewDay;
    if (!cur||!cur.dayData||cur.dayData.type==='rest') return;
    App.openWorkout(cur.dayKey, cur.dayData);
  },

  /* ── EXERCISE DETAIL ── */
  openExerciseDetail(encodedName) {
    const name = decodeURIComponent(encodedName);
    const info = getExerciseInfo(name);
    if (!info) return;
    App._exerciseDetailFrom = document.querySelector('.screen.active')?.id?.replace('screen-','') || 'day-preview';

    document.getElementById('ex-detail-name').textContent       = info.name;
    document.getElementById('ex-detail-difficulty').textContent = info.difficulty;
    document.getElementById('ex-detail-difficulty').className   = 'ex-detail-badge badge-'+info.difficulty.toLowerCase();
    document.getElementById('ex-detail-muscles').innerHTML      = info.muscles.map(m=>'<span class="ex-tag">'+m+'</span>').join('');
    document.getElementById('ex-detail-equipment').textContent  = info.equipment;

    // Video
    const videoEl = document.getElementById('ex-detail-video');
    if (info.videoUrl) {
      videoEl.innerHTML = '<iframe src="'+info.videoUrl+'" frameborder="0" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope"></iframe>';
    } else {
      videoEl.innerHTML = '<div class="video-placeholder">🎬 Video coming soon</div>';
    }

    document.getElementById('ex-detail-instructions').innerHTML = info.instructions.map(s=>'<li>'+s+'</li>').join('');
    document.getElementById('ex-detail-mistakes').innerHTML     = info.mistakes.map(s=>'<li>'+s+'</li>').join('');
    document.getElementById('ex-detail-safety').innerHTML       = info.safety.map(s=>'<li>'+s+'</li>').join('');
    document.getElementById('ex-rec-sets').textContent = info.sets;
    document.getElementById('ex-rec-reps').textContent = info.reps;
    document.getElementById('ex-rec-rest').textContent = info.rest;
    App.go('exercise-detail');
  },

  closeExerciseDetail() {
    App.go(App._exerciseDetailFrom || 'day-preview');
  },

  /* ── ACTIVE WORKOUT ── */
  openWorkout(dayKey, dayData) {
    if (!dayData||dayData.type==='rest') return;
    App.currentWorkout = { dayKey, dayData };
    document.getElementById('workout-day-label').textContent  = dayKey;
    document.getElementById('workout-name-label').textContent = dayData.name;
    App.renderExercises();
    App.go('workout');
    document.getElementById('disclaimer').classList.remove('hidden');
  },

  renderExercises() {
    const { dayKey, dayData } = App.currentWorkout;
    const list = document.getElementById('exercise-list');
    list.innerHTML = dayData.exercises.map((ex,ei)=>{
      const wKey=dayKey+'-'+ei, storedW=State.weights[wKey];
      const dispW = storedW!==undefined ? storedW : ex.weight;
      const done  = App.allSetsDone(dayKey,ei,ex.sets);
      const hasInfo = !!getExerciseInfo(ex.name);

      const setsHTML = Array.from({length:ex.sets},(_,si)=>{
        const isDone = !!State.setStates[dayKey+'-'+ei+'-'+si];
        return '<div class="set-item">'+
          '<button class="set-btn'+(isDone?' done':'')+'" onclick="App.toggleSet(\''+dayKey+'\','+ei+','+si+')" aria-label="Set '+(si+1)+(isDone?' complete':' incomplete')+'">'+
            (isDone?'✅':'⭕')+'</button>'+
          '<div class="set-label">Set '+(si+1)+'</div></div>';
      }).join('');

      const weightHTML = dispW!==null ?
        '<div class="ex-weight"><div class="ex-weight-val">'+dispW+'kg</div>'+
        '<button class="weight-edit-btn" onclick="App.editWeight(\''+dayKey+'\','+ei+','+dispW+')">edit</button></div>' : '';

      return '<div class="exercise-card'+(done?' all-done':'')+'" id="excard-'+ei+'">'+
        '<div class="ex-header"><div>'+
          '<div class="ex-name'+(hasInfo?' clickable"onclick="App.openExerciseDetail(\''+encodeURIComponent(ex.name)+'\')"':'\"')+'>'+
            ex.name+(hasInfo?' <span class="ex-info-badge">ℹ️</span>':'')+'</div>'+
          '<div class="ex-meta">'+ex.sets+' sets · '+ex.reps+' reps · Rest '+ex.rest+'</div>'+
          '<div class="ex-meta">'+( ex.muscle||'')+'</div>'+
          '<div class="ex-science">'+(ex.science||'')+'</div>'+
        '</div>'+weightHTML+'</div>'+
        '<div class="sets-row">'+setsHTML+'</div></div>';
    }).join('');
    App.updateProgress();
  },

  allSetsDone(dayKey,ei,totalSets) {
    return Array.from({length:totalSets},(_,si)=>!!State.setStates[dayKey+'-'+ei+'-'+si]).every(Boolean);
  },

  toggleSet(dayKey,ei,si) {
    const k=dayKey+'-'+ei+'-'+si;
    State.setStates[k]=!State.setStates[k];
    saveState(); App.renderExercises();
  },

  editWeight(dayKey,ei,current) {
    const val=prompt('Weight for this exercise (kg):',current);
    if (val!==null&&!isNaN(+val)&&+val>=0) { State.weights[dayKey+'-'+ei]=+val; saveState(); App.renderExercises(); }
  },

  updateProgress() {
    if (!App.currentWorkout) return;
    const {dayKey,dayData}=App.currentWorkout;
    const totalSets=dayData.exercises.reduce((s,e)=>s+e.sets,0);
    const doneSets =dayData.exercises.reduce((s,e,ei)=>
      s+Array.from({length:e.sets},(_,si)=>State.setStates[dayKey+'-'+ei+'-'+si]?1:0).reduce((a,b)=>a+b,0),0);
    document.getElementById('workout-progress-fill').style.width=(totalSets?Math.round(doneSets/totalSets*100):0)+'%';
    const doneEx=dayData.exercises.filter((_,ei)=>App.allSetsDone(dayKey,ei,dayData.exercises[ei].sets)).length;
    document.getElementById('workout-prog-text').textContent=doneEx+'/'+dayData.exercises.length;
    document.getElementById('workout-prog-text').textContent=doneEx+'/'+dayData.exercises.length;
  },

  finishWorkout() {
    if (!App.currentWorkout) return;
    const {dayKey,dayData}=App.currentWorkout;
    const dateStr=today();
    if (!State.completedDates.includes(dateStr)) State.completedDates.push(dateStr);
    saveState();
    const totalEx=dayData.exercises.length;
    const doneEx=dayData.exercises.filter((_,ei)=>App.allSetsDone(dayKey,ei,dayData.exercises[ei].sets)).length;
    document.getElementById('c-exercises').textContent=doneEx;
    document.getElementById('c-pct').textContent=totalEx?Math.round(doneEx/totalEx*100)+'%':'100%';
    document.getElementById('c-streak').textContent=calcStreak();
    const n=State.displayName;
    document.getElementById('complete-congrats').textContent=n?'Great work today, '+n+'! 💪':'Great work! 💪';
    document.getElementById('disclaimer').classList.add('hidden');
    App.go('complete');
  },

  populateEditProfile() {
    if (!State.profile) return;
    document.getElementById('ep-age').value    = State.profile.age||'';
    document.getElementById('ep-weight').value = State.profile.weight||'';
    document.getElementById('ep-height').value = State.profile.height||'';
    document.getElementById('ep-gender').value = State.profile.gender||'';
    ['ep-experience','ep-goal'].forEach(g=>{
      document.querySelectorAll('#'+g+' .pill').forEach(p=>p.classList.remove('selected'));
    });
    const expBtn=document.querySelector('#ep-experience [data-val="'+(State.profile.experience||'')+'"]');
    if (expBtn) expBtn.classList.add('selected');
    const golBtn=document.querySelector('#ep-goal [data-val="'+(State.goal||'')+'"]');
    if (golBtn) golBtn.classList.add('selected');
  },

  saveProfile() {
    const age=parseInt(document.getElementById('ep-age').value);
    const weight=parseFloat(document.getElementById('ep-weight').value);
    const height=parseFloat(document.getElementById('ep-height').value);
    const gender=document.getElementById('ep-gender').value;
    const expBtn=document.querySelector('#ep-experience .pill.selected');
    const golBtn=document.querySelector('#ep-goal .pill.selected');
    const errEl=document.getElementById('ep-error');
    if (!age||age<13)       return showError(errEl,'Please enter a valid age.');
    if (!weight||weight<30) return showError(errEl,'Please enter a valid weight.');
    if (!height||height<100)return showError(errEl,'Please enter a valid height.');
    if (!gender)            return showError(errEl,'Please select a gender.');
    if (!expBtn)            return showError(errEl,'Please select experience level.');
    if (!golBtn)            return showError(errEl,'Please select a goal.');
    errEl.classList.add('hidden');
    State.profile = { age,weight,height,gender,experience:expBtn.dataset.val };
    State.goal    = golBtn.dataset.val;
    if (State.workoutDays.length&&State.styles.length) {
      State.weeklyPlan=generateWeeklyPlan(State.profile,State.styles,State.goal,State.workoutDays);
    }
    saveState(); showToast('Profile saved! Plan rebuilt.'); App.go('settings');
  },

  async saveReminder() {
    const timeBtn=document.querySelector('#reminder-time-group .pill.selected');
    const statusEl=document.getElementById('notif-status');
    if (!timeBtn) { alert('Please select a time.'); return; }
    State.reminderTime=timeBtn.dataset.val; saveState();
    if (!('Notification' in window)) {
      statusEl.textContent='⚠️ Notifications not supported in this browser.';
      statusEl.classList.remove('hidden'); return;
    }
    const perm=Notification.permission==='granted'?'granted':await Notification.requestPermission();
    if (perm!=='granted') {
      statusEl.textContent='⚠️ Permission denied. Enable in your browser/phone settings.';
      statusEl.classList.remove('hidden'); return;
    }
    statusEl.classList.add('hidden');
    App._scheduleNotification(State.reminderTime);
    showToast('Reminder set for '+timeBtn.textContent+' ✅');
    App.go('settings');
  },

  _scheduleNotification(time) {
    const [h,m]=time.split(':').map(Number);
    const now=new Date(), target=new Date();
    target.setHours(h,m,0,0);
    if (target<=now) target.setDate(target.getDate()+1);
    setTimeout(()=>{
      if (Notification.permission==='granted') {
        new Notification('WorkoutForge ⚡',{body:'Time to train! Your workout is ready.',icon:'./icon-192.png'});
      }
      App._scheduleNotification(time);
    }, target-now);
  },

  renderSettings() {
    const uEl=document.getElementById('settings-user');
    if (uEl) uEl.textContent=State.accountType==='guest'?'Guest (saved locally)':(State.displayName||State.uid||'—');
    const rEl=document.getElementById('settings-reminder');
    if (rEl&&State.reminderTime) {
      const [h,m]=State.reminderTime.split(':'); const d=new Date(); d.setHours(+h,+m);
      rEl.textContent=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    } else if (rEl) { rEl.textContent='Not set'; }
    document.getElementById('theme-dark').classList.toggle('selected',State.theme==='dark');
    document.getElementById('theme-light').classList.toggle('selected',State.theme==='light');
  },

  setTheme(t) { State.theme=t; applyTheme(t); saveState(); App.renderSettings(); },

  exportData() {
    const blob=new Blob([JSON.stringify(State,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url; a.download='workoutforge-'+today()+'.json'; a.click(); URL.revokeObjectURL(url);
  },

  importData(e) {
    const file=e.target.files[0]; if (!file) return;
    const reader=new FileReader();
    reader.onload=evt=>{
      try { Object.assign(State,JSON.parse(evt.target.result)); saveState(); applyTheme(State.theme); App.go('dashboard'); showToast('Data imported!'); }
      catch(_) { alert('Invalid file.'); }
    };
    reader.readAsText(file); e.target.value='';
  },

  resetData() {
    if (!confirm('Reset ALL data? Cannot be undone.')) return;
    try { localStorage.removeItem('wf_v3'); } catch(e) {}
    location.reload();
  },
};

/* ════════════ BOOT ════════════ */
window.App  = App;
window.Auth = Auth;
App.init();

if (State.reminderTime && typeof Notification!=='undefined' && Notification.permission==='granted') {
  App._scheduleNotification(State.reminderTime);
}
