/* ═══════════════════════════════════════════════════════
   WORKOUTFORGE — script.js v2
   Evidence-based programming · Full auth · Week browser
   Sources: ACSM 2026, NSCA, Frontiers Sports Medicine,
            ACE Fitness, Journal of Strength & Conditioning
═══════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════
   EVIDENCE-BASED EXERCISE DATABASE
   ════════════════════════════════════════
   Sets/reps/rest based on:
   • Strength:   3-5 reps, 80-100% 1RM, 3-5 min rest (NSCA/ACSM 2026)
   • Hypertrophy:6-12 reps, 67-85% 1RM, 60-90s rest (Schoenfeld 2010, Frontiers 2025)
   • Fat Loss:   12-15 reps, circuit style, 30-60s rest (NASM, PMC 2024)
   • General:    8-12 reps, 75% 1RM, 90s rest (ACSM general guidelines)
   ════════════════════════════════════════ */

const GOAL_PARAMS = {
  strength: {
    sets: 5, reps: '3–5', rest: '3–5 min',
    note: 'Heavy load ≈80–100% 1RM · Long rest for neural recovery (NSCA)',
    weightMult: 1.0
  },
  muscle: {
    sets: 4, reps: '6–12', rest: '60–90 s',
    note: 'Moderate load ≈67–85% 1RM · Hypertrophy sweet spot (ACSM 2026)',
    weightMult: 0.75
  },
  fatloss: {
    sets: 3, reps: '12–15', rest: '30–60 s',
    note: 'Circuit style · Short rest elevates metabolic stress (PMC 2024)',
    weightMult: 0.55
  },
  general: {
    sets: 3, reps: '8–12', rest: '90 s',
    note: 'Balanced load · 3 sets per exercise · ACSM baseline',
    weightMult: 0.65
  }
};

/* ── WEIGHT TRAINING — Evidence-based EMG top exercises ── */
const WT = {
  /* PUSH — Bench Press: 95% MVC pec activation (JEFIT EMG study) */
  push: [
    { name:'Barbell Bench Press',    muscle:'Chest · Triceps · Anterior Delts',  science:'95% MVC pec activation — EMG gold standard', weights:{beginner:20,intermediate:60,advanced:100} },
    { name:'Overhead Press',         muscle:'Shoulders · Triceps · Upper Back',   science:'Top deltoid compound — NSCA recommended',      weights:{beginner:15,intermediate:40,advanced:65}  },
    { name:'Incline DB Press',       muscle:'Upper Chest · Front Delt',           science:'Greater upper-pec activation vs flat press',   weights:{beginner:10,intermediate:24,advanced:40}  },
    { name:'Cable Lateral Raise',    muscle:'Medial Deltoid',                     science:'Constant tension superior to DB raises (EMG)',  weights:{beginner:5, intermediate:12,advanced:20}  },
    { name:'Tricep Rope Pushdown',   muscle:'Triceps',                            science:'Isolation — lateral head emphasis',             weights:{beginner:10,intermediate:25,advanced:40}  },
    { name:'Dips',                   muscle:'Lower Chest · Triceps',              science:'High pec major activation — compound push',    weights:{beginner:0, intermediate:10,advanced:25}  },
  ],
  /* PULL — Deadlift: highest lat/trap recruitment (NSCA 2024) */
  pull: [
    { name:'Deadlift',               muscle:'Full Back · Glutes · Hamstrings',    science:'Greatest total muscle recruitment of any lift',  weights:{beginner:40,intermediate:100,advanced:160} },
    { name:'Barbell Bent-Over Row',  muscle:'Lats · Mid Traps · Rear Delts',     science:'Top mid-back ACE Fitness ranking',              weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Pull-ups',               muscle:'Lats · Biceps · Rhomboids',          science:'Highest lat activation bodyweight exercise',    weights:{beginner:0, intermediate:10,advanced:20}  },
    { name:'Lat Pulldown',           muscle:'Lats · Lower Traps',                 science:'Equivalent to pull-up for lat EMG',             weights:{beginner:30,intermediate:60,advanced:90}  },
    { name:'Face Pulls',             muscle:'Rear Delts · Upper Traps',           science:'Top rear-delt exercise — posture & health',    weights:{beginner:10,intermediate:25,advanced:40}  },
    { name:'Barbell Bicep Curl',     muscle:'Biceps Brachii',                     science:'Full ROM critical — supination at top',         weights:{beginner:10,intermediate:25,advanced:40}  },
  ],
  /* LEGS — Squat: 74% MVC quads (EMG study) */
  legs: [
    { name:'Barbell Back Squat',     muscle:'Quads · Glutes · Hamstrings · Core', science:'74% MVC quads — most effective leg compound',  weights:{beginner:40,intermediate:90,advanced:140} },
    { name:'Romanian Deadlift',      muscle:'Hamstrings · Glutes · Lower Back',   science:'Top hamstring isolation — hip hinge pattern',  weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Leg Press',              muscle:'Quads · Glutes',                     science:'Safe high-load alternative to squat',          weights:{beginner:60,intermediate:140,advanced:220} },
    { name:'Bulgarian Split Squat',  muscle:'Quads · Glutes · Hip Stability',     science:'Best single-leg quad exercise (J Strength)',   weights:{beginner:10,intermediate:25,advanced:45}  },
    { name:'Leg Curl (Machine)',     muscle:'Hamstrings',                         science:'Seated curl: superior hamstring activation',   weights:{beginner:20,intermediate:45,advanced:70}  },
    { name:'Standing Calf Raise',    muscle:'Gastrocnemius · Soleus',             science:'Full stretch-contract ROM essential',           weights:{beginner:30,intermediate:70,advanced:110} },
  ],
  upper: [
    { name:'Barbell Bench Press',    muscle:'Chest · Triceps',                    science:'95% MVC pec — EMG gold standard',              weights:{beginner:20,intermediate:60,advanced:100} },
    { name:'Barbell Bent-Over Row',  muscle:'Lats · Mid Back',                   science:'Top mid-back compound movement',                weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Overhead Press',         muscle:'Shoulders · Triceps',                science:'Best deltoid compound — NSCA',                  weights:{beginner:15,intermediate:40,advanced:65}  },
    { name:'Pull-ups',               muscle:'Lats · Biceps',                      science:'Highest lat activation bodyweight',             weights:{beginner:0, intermediate:10,advanced:20}  },
    { name:'Cable Lateral Raise',    muscle:'Medial Delts',                       science:'Constant tension — superior to DB version',     weights:{beginner:5, intermediate:12,advanced:20}  },
    { name:'Barbell Bicep Curl',     muscle:'Biceps',                             science:'Full supination ROM for peak activation',       weights:{beginner:10,intermediate:25,advanced:40}  },
  ],
  lower: [
    { name:'Barbell Back Squat',     muscle:'Quads · Glutes · Core',              science:'74% MVC quads — most complete leg exercise',   weights:{beginner:40,intermediate:90,advanced:140} },
    { name:'Romanian Deadlift',      muscle:'Hamstrings · Glutes',                science:'Hip hinge — top posterior chain exercise',     weights:{beginner:30,intermediate:70,advanced:110} },
    { name:'Bulgarian Split Squat',  muscle:'Quads · Glutes · Stability',         science:'Single-leg: corrects imbalances (J Strength)', weights:{beginner:10,intermediate:25,advanced:45}  },
    { name:'Leg Press',              muscle:'Quads · Glutes',                     science:'High load capacity — safe overload tool',       weights:{beginner:60,intermediate:140,advanced:220} },
    { name:'Leg Curl (Machine)',     muscle:'Hamstrings',                         science:'Essential hamstring balance for knee health',   weights:{beginner:20,intermediate:45,advanced:70}  },
    { name:'Standing Calf Raise',    muscle:'Calves',                             science:'Full ROM at bottom — stretch component key',   weights:{beginner:30,intermediate:70,advanced:110} },
  ],
  fullbody: [
    { name:'Barbell Back Squat',     muscle:'Lower Body · Core',                  science:'Most muscle mass recruited — compound king',   weights:{beginner:35,intermediate:80,advanced:130} },
    { name:'Barbell Bench Press',    muscle:'Chest · Triceps · Shoulders',        science:'95% MVC pec activation (EMG)',                 weights:{beginner:20,intermediate:55,advanced:90}  },
    { name:'Deadlift',               muscle:'Full Posterior Chain',               science:'Greatest total body recruitment of any lift',   weights:{beginner:40,intermediate:90,advanced:140} },
    { name:'Overhead Press',         muscle:'Shoulders · Triceps',                science:'NSCA top deltoid compound',                     weights:{beginner:15,intermediate:35,advanced:60}  },
    { name:'Barbell Bent-Over Row',  muscle:'Back · Biceps',                     science:'Top mid-back compound — ACE #1 back exercise',  weights:{beginner:25,intermediate:60,advanced:95}  },
  ],
};

/* ── CALISTHENICS — Progression-based by experience ── */
const CL = {
  push_beginner: [
    { name:'Incline Push-ups',       muscle:'Chest · Triceps · Shoulders',   science:'Reduced load — master form first (NSCA youth)',  weights:null },
    { name:'Standard Push-ups',      muscle:'Chest · Triceps · Core',        science:'70% body weight load — full ROM key (ACE)',      weights:null },
    { name:'Diamond Push-ups',       muscle:'Triceps · Inner Chest',         science:'Narrow grip shifts load to triceps 30%',         weights:null },
    { name:'Pike Push-ups',          muscle:'Shoulders · Upper Chest',       science:'Mimics overhead press pattern',                  weights:null },
  ],
  push_intermediate: [
    { name:'Close-Grip Push-ups',    muscle:'Triceps · Chest',               science:'Narrow grip: +40% tricep activation (EMG)',     weights:null },
    { name:'Archer Push-ups',        muscle:'Chest · Stability Muscles',     science:'Unilateral load — injury prevention',            weights:null },
    { name:'Dips (Parallel bars)',   muscle:'Lower Chest · Triceps',         science:'High pec major activation — best chest dip',     weights:null },
    { name:'Pike Push-ups',          muscle:'Shoulders',                     science:'Progressive toward handstand push-up',           weights:null },
    { name:'Pseudo-Planche Push-ups',muscle:'Chest · Wrists · Core',        science:'Leaning forward increases difficulty 40%',       weights:null },
  ],
  push_advanced: [
    { name:'Ring Push-ups',          muscle:'Chest · Stabilisers',           science:'Instability increases pec activation (EMG)',     weights:null },
    { name:'Dips (Weighted)',        muscle:'Chest · Triceps',               science:'Progressive overload — load adds hypertrophy',   weights:null },
    { name:'Handstand Push-up Neg.', muscle:'Shoulders · Triceps',           science:'Eccentric focus — superior strength gain',       weights:null },
    { name:'Archer Push-ups',        muscle:'Chest · Shoulder Stability',    science:'Single-arm progression step',                    weights:null },
    { name:'Plyometric Push-ups',    muscle:'Chest · Power Output',          science:'Type II fibre activation — power development',   weights:null },
  ],
  pull_beginner: [
    { name:'Dead Hang',              muscle:'Grip · Lats · Shoulder Health', science:'Foundation — connective tissue conditioning',    weights:null },
    { name:'Scapular Pulls',         muscle:'Lower Traps · Rhomboids',       science:'Activates stabilisers before pull-up load',      weights:null },
    { name:'Australian Rows',        muscle:'Lats · Mid Back · Biceps',      science:'Bodyweight row — 60% bodyweight load',           weights:null },
    { name:'Negative Pull-ups',      muscle:'Lats · Biceps',                 science:'Eccentric only: fastest pull-up progress',       weights:null },
  ],
  pull_intermediate: [
    { name:'Pull-ups',               muscle:'Lats · Biceps · Core',          science:'Highest lat activation bodyweight exercise',     weights:null },
    { name:'Chin-ups',               muscle:'Lats · Biceps (peak)',           science:'Supinated grip: +30% bicep recruitment (EMG)',  weights:null },
    { name:'Australian Rows',        muscle:'Mid Back · Rear Delts',         science:'Horizontal pull — balances vertical plane',      weights:null },
    { name:'Commando Pull-ups',      muscle:'Lats · Biceps · Forearms',      science:'Neutral grip — easier on wrists and elbows',     weights:null },
  ],
  pull_advanced: [
    { name:'Weighted Pull-ups',      muscle:'Lats · Biceps',                 science:'Progressive overload principle — ACSM',          weights:null },
    { name:'Archer Pull-ups',        muscle:'Lats · Unilateral Strength',    science:'Single-arm progression step',                    weights:null },
    { name:'L-sit Pull-ups',         muscle:'Lats · Core · Hip Flexors',     science:'Compound difficulty — advanced skill work',      weights:null },
    { name:'Typewriter Pull-ups',    muscle:'Lats · Rhomboids',              science:'Lateral movement: new muscle angles',            weights:null },
  ],
  legs_beginner: [
    { name:'Bodyweight Squats',      muscle:'Quads · Glutes · Hamstrings',   science:'Master squat pattern before loading',            weights:null },
    { name:'Glute Bridges',          muscle:'Glutes · Hamstrings',           science:'Hip extension — glute activation foundation',    weights:null },
    { name:'Lunges',                 muscle:'Quads · Glutes · Balance',      science:'Unilateral — functional movement pattern',       weights:null },
    { name:'Step-ups',               muscle:'Quads · Glutes',                science:'Controlled load — knee-friendly progression',    weights:null },
    { name:'Calf Raises',            muscle:'Gastrocnemius · Soleus',        science:'Full ROM essential — stretch at bottom',         weights:null },
  ],
  legs_intermediate: [
    { name:'Jump Squats',            muscle:'Quads · Glutes · Power',        science:'Type II fast-twitch activation — power phase',   weights:null },
    { name:'Bulgarian Split Squat',  muscle:'Quads · Glutes · Stability',    science:'Best single-leg exercise (J Strength & Cond)',   weights:null },
    { name:'Single-Leg Glute Bridge',muscle:'Glutes · Hamstrings',           science:'Unilateral: prevents left-right imbalance',      weights:null },
    { name:'Lateral Lunges',         muscle:'Adductors · Quads · Glutes',    science:'Frontal plane — neglected in most programmes',   weights:null },
    { name:'Nordic Hamstring Curl',  muscle:'Hamstrings',                    science:'40% injury reduction in athletes (BMJ 2019)',    weights:null },
  ],
  legs_advanced: [
    { name:'Pistol Squat',           muscle:'Quads · Glutes · Balance',      science:'Max unilateral quad strength test',              weights:null },
    { name:'Dragon Pistol Squat',    muscle:'Quads · Hip Flexors',           science:'Advanced progression — elite calisthenic skill', weights:null },
    { name:'Shrimp Squat',           muscle:'Quads · Glutes',                science:'Rear-foot elevated single-leg variation',        weights:null },
    { name:'Jump Lunges',            muscle:'Quads · Power · Glutes',        science:'Plyometric — Type II fast-twitch fibre stress',  weights:null },
    { name:'Nordic Hamstring Curl',  muscle:'Hamstrings',                    science:'Gold standard hamstring eccentric exercise',     weights:null },
  ],
  fullbody_beginner: [
    { name:'Standard Push-ups',      muscle:'Chest · Triceps',               science:'Foundation of calisthenics upper push',          weights:null },
    { name:'Australian Rows',        muscle:'Back · Biceps',                  science:'Horizontal pull — beginner back exercise',       weights:null },
    { name:'Bodyweight Squats',      muscle:'Legs · Glutes',                  science:'Squat pattern — most important lower movement',  weights:null },
    { name:'Glute Bridges',          muscle:'Glutes · Hamstrings',           science:'Hip hinge foundation',                           weights:null },
    { name:'Plank',                  muscle:'Core · Shoulders',               science:'Anti-extension core — spinal stability',         weights:null },
  ],
  fullbody_intermediate: [
    { name:'Push-ups',               muscle:'Chest · Triceps',               science:'Master variation before progressing',            weights:null },
    { name:'Pull-ups',               muscle:'Lats · Biceps',                 science:'Highest lat activation — bodyweight',            weights:null },
    { name:'Bulgarian Split Squat',  muscle:'Quads · Glutes',                science:'Best unilateral leg exercise (JSCR)',            weights:null },
    { name:'Dips',                   muscle:'Chest · Triceps',               science:'Compound push — chest and tricep emphasis',      weights:null },
    { name:'L-sit Hold',             muscle:'Core · Hip Flexors',            science:'Isometric compression — core elite standard',    weights:null },
  ],
  fullbody_advanced: [
    { name:'Ring Push-ups',          muscle:'Chest · Stabilisers',           science:'Instability +20% pec activation (EMG)',          weights:null },
    { name:'Weighted Pull-ups',      muscle:'Lats · Biceps',                 science:'Progressive overload — adds hypertrophy',        weights:null },
    { name:'Pistol Squats',          muscle:'Quads · Balance',               science:'Full unilateral lower body assessment',          weights:null },
    { name:'Weighted Dips',          muscle:'Chest · Triceps',               science:'Load adds size — overload principle',            weights:null },
    { name:'Dragon Flag',            muscle:'Full Core',                     science:'Bruce Lee exercise — elite core strength',       weights:null },
  ],
};

/* ── YOGA — Session types with evidence notes ── */
const YOGA = {
  mobility: [
    { name:'Sun Salutation A (×5)',  muscle:'Full Body Warm-up',             science:'Dynamic flow — raises core temp, improves ROM',  weights:null },
    { name:'Cat-Cow Flow',           muscle:'Spine · Core',                  science:'Spinal mobility — reduces lower back stiffness', weights:null },
    { name:'Hip Flexor Lunge Stretch',muscle:'Hip Flexors · Quads',         science:'Counters sitting posture — hip extension',       weights:null },
    { name:"Child's Pose",           muscle:'Lower Back · Hips · Lats',     science:'Passive stretch — parasympathetic activation',   weights:null },
    { name:'Thread the Needle',      muscle:'Upper Back · Rotational',       science:'Thoracic rotation — desk worker essential',      weights:null },
  ],
  flexibility: [
    { name:'Seated Forward Fold',    muscle:'Hamstrings · Lower Back',       science:'Hold 60s — long-duration gains flexibility',     weights:null },
    { name:'Pigeon Pose',            muscle:'Hip External Rotators · Glutes',science:'Most effective hip opener — 90s each side',      weights:null },
    { name:'Supine Twist',           muscle:'Spine · IT Band · Glutes',      science:'Spinal rotation — nerve tension relief',         weights:null },
    { name:'Lizard Pose',            muscle:'Hip Flexors · Groin',           science:'Deep hip extension stretch — runners essential', weights:null },
    { name:'Reclined Bound Angle',   muscle:'Inner Groin · Hip Rotators',    science:'Passive hip opening — gravity assisted',         weights:null },
  ],
  balance: [
    { name:'Tree Pose',              muscle:'Standing Leg · Core',           science:'Proprioception training — reduces fall risk',    weights:null },
    { name:'Warrior III',            muscle:'Glutes · Core · Balance',       science:'Single-leg hip extension — functional strength', weights:null },
    { name:'Eagle Pose',             muscle:'Hips · Shoulders · Balance',    science:'Cross-body coordination — neural challenge',     weights:null },
    { name:'Half Moon Pose',         muscle:'Core · Outer Hip · Balance',    science:'Lateral stability — glute med activation',      weights:null },
    { name:'Warrior I',              muscle:'Legs · Core · Stability',       science:'Foundational standing pose — hip alignment',     weights:null },
  ],
  recovery: [
    { name:'Legs Up the Wall',       muscle:'Hamstrings · Lower Back',       science:'Lymphatic drainage — reduces leg fatigue',       weights:null },
    { name:'Supine Twist (2 min ea)',muscle:'Spine · Glutes',                science:'Parasympathetic — lowers cortisol post-workout', weights:null },
    { name:'Supported Bridge Pose',  muscle:'Lower Back · Hip Flexors',      science:'Passive back extension — counters flexion',      weights:null },
    { name:'Savasana',               muscle:'Full Body Rest',                science:'Consolidates neural adaptations from session',   weights:null },
  ],
};

/* ── PILATES — Core-based sessions ── */
const PIL = {
  core: [
    { name:'The Hundred',            muscle:'Core · Breathing',              science:'Classic Pilates — diaphragmatic engagement',     weights:null },
    { name:'Roll-Up',                muscle:'Abdominals · Spine Articulation',science:'Spinal flexion control — full range',           weights:null },
    { name:'Double Leg Stretch',     muscle:'Core · Hip Flexors',            science:'Lengthening + compression — dual core demand',   weights:null },
    { name:'Criss-Cross',            muscle:'Obliques · Core',               science:'Rotational core — sports transfer',              weights:null },
    { name:'Plank Hold',             muscle:'Core · Shoulders',              science:'Anti-extension — spinal neutral hold',           weights:null },
  ],
  stability: [
    { name:'Single Leg Circles',     muscle:'Hip Stability · Core',          science:'Joint centration — hip socket health',           weights:null },
    { name:'Bird Dog',               muscle:'Core · Glutes · Lower Back',    science:'McGill Big 3 — spine-sparing core exercise',     weights:null },
    { name:'Side-Lying Leg Lifts',   muscle:'Glute Med · Hip Abductors',     science:'Glute med: key for knee and hip alignment',      weights:null },
    { name:'Clam Shell',             muscle:'Hip External Rotators',         science:'Activates glute med — underused stabiliser',     weights:null },
    { name:'Dead Bug',               muscle:'Core · Anti-Rotation',          science:'McGill recommended — neutral spine stability',   weights:null },
  ],
  flexibility: [
    { name:'Spine Stretch Forward',  muscle:'Hamstrings · Spine',            science:'Active elongation — not passive collapse',       weights:null },
    { name:'Swan Dive Prep',         muscle:'Spinal Extensors · Glutes',     science:'Back extension — posture correction essential',  weights:null },
    { name:'Saw',                    muscle:'Obliques · Hamstrings',         science:'Rotational + flexion — multi-plane mobility',    weights:null },
    { name:'Mermaid Stretch',        muscle:'Lateral Spine · Obliques',      science:'Lateral chain stretch — IT band and QL relief',  weights:null },
  ],
  recovery: [
    { name:'Constructive Rest Position',muscle:'Psoas Release · Lower Back', science:'Gravity-assisted psoas release — 5 min',         weights:null },
    { name:'Pelvic Clock',           muscle:'Lumbar Stability · Core',       science:'Neuromuscular — maps pelvic neutral position',   weights:null },
    { name:'Lateral Breathing',      muscle:'Diaphragm · Intercostals',      science:'Pilates breath — rib cage expansion technique', weights:null },
    { name:'Chest Opener Stretch',   muscle:'Pec Minor · Anterior Chain',    science:'Counters forward head posture and kyphosis',     weights:null },
  ],
};

const ALL_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

/* ════════════════════════════════════════
   PLAN GENERATOR
   ════════════════════════════════════════ */

const FREQ_MAP = {
  beginner:     { easy:3, balanced:4, fast:5 },
  intermediate: { easy:4, balanced:5, fast:6 },
  advanced:     { easy:5, balanced:6, fast:6 },
};
const DAY_TEMPLATES = {
  3:['Mon','Wed','Fri'],
  4:['Mon','Tue','Thu','Fri'],
  5:['Mon','Tue','Wed','Fri','Sat'],
  6:['Mon','Tue','Wed','Thu','Fri','Sat'],
};

function getRecommendedDays(experience, intensity) {
  const freq = FREQ_MAP[experience][intensity];
  return DAY_TEMPLATES[freq] || DAY_TEMPLATES[3];
}

function generateWeeklyPlan(profile, style, goal, workoutDays) {
  const plan = {};
  ALL_DAYS.forEach(d => {
    plan[d] = workoutDays.includes(d)
      ? buildDayWorkout(style, goal, profile.experience, workoutDays.length, workoutDays.indexOf(d))
      : { type:'rest', name:'Rest Day', exercises:[], scienceNote:'Active recovery — muscles rebuild on rest days' };
  });
  return plan;
}

function buildDayWorkout(style, goal, experience, freq, dayIndex) {
  const p = GOAL_PARAMS[goal];
  let exercises = [], sessionName = '', scienceNote = p.note;

  if (style === 'weights') {
    let key;
    if (freq <= 3) {
      key = 'fullbody'; sessionName = 'Full Body';
    } else if (freq === 4) {
      key = ['upper','lower','upper','lower'][dayIndex % 4];
      sessionName = key === 'upper' ? 'Upper Body' : 'Lower Body';
    } else {
      key = ['push','pull','legs','push','pull','legs'][dayIndex % 3];
      sessionName = key.charAt(0).toUpperCase() + key.slice(1) + ' Day';
    }
    exercises = applyGoalParams(WT[key], p, experience);

  } else if (style === 'calisthenics') {
    const splits = freq <= 3
      ? ['fullbody','fullbody','fullbody']
      : ['push','pull','legs','fullbody','push','pull'];
    const split = splits[dayIndex % splits.length];
    const lvlKey = `${split}_${experience}`;
    const base = CL[lvlKey] || CL[`${split}_beginner`];
    sessionName = split.charAt(0).toUpperCase() + split.slice(1);
    exercises = base.map(ex => ({ ...ex, sets:p.sets, reps:p.reps, rest:p.rest, weight:null }));

  } else if (style === 'yoga') {
    const sessions = [
      { key:'mobility',    name:'Mobility Flow' },
      { key:'flexibility', name:'Flexibility' },
      { key:'balance',     name:'Balance & Strength' },
      { key:'recovery',    name:'Recovery Session' },
    ];
    const s = sessions[dayIndex % sessions.length];
    sessionName = s.name;
    exercises = YOGA[s.key].map(ex => ({ ...ex, sets:2, reps:'Hold as instructed', rest:'Breathe through it', weight:null }));

  } else if (style === 'pilates') {
    const sessions = [
      { key:'core',        name:'Core Power' },
      { key:'stability',   name:'Stability' },
      { key:'flexibility', name:'Flexibility Flow' },
      { key:'recovery',    name:'Recovery' },
    ];
    const s = sessions[dayIndex % sessions.length];
    sessionName = s.name;
    exercises = PIL[s.key].map(ex => ({ ...ex, sets:3, reps:'10 reps / as noted', rest:'30 s', weight:null }));
  }

  return { type:'workout', name:sessionName, exercises, scienceNote };
}

function applyGoalParams(exList, p, experience) {
  return exList.map(ex => {
    const baseW = ex.weights ? ex.weights[experience] : null;
    const weight = baseW !== null ? Math.round(baseW * p.weightMult) : null;
    return { ...ex, sets:p.sets, reps:p.reps, rest:p.rest, weight };
  });
}

/* ════════════════════════════════════════
   STATE
   ════════════════════════════════════════ */

const DEFAULT_STATE = {
  user:           null,   // { id, email, method, name }
  profile:        null,
  style:          null,
  goal:           null,
  scheduleMode:   null,
  intensity:      null,
  workoutDays:    [],
  weeklyPlan:     null,
  completedDates: [],
  setStates:      {},
  weights:        {},
  reminderTime:   null,
  theme:          'dark',
  notifAsked:     false,
};

const State = Object.assign({}, DEFAULT_STATE);

function saveState() {
  try { localStorage.setItem('wf_v2', JSON.stringify(State)); } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem('wf_v2');
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s && typeof s === 'object') Object.assign(State, s);
  } catch(e) {
    try { localStorage.removeItem('wf_v2'); } catch(_) {}
  }
}

/* ════════════════════════════════════════
   AUTH MODULE
   ════════════════════════════════════════ */

const Auth = {
  showTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('panel-' + tab).classList.remove('hidden');
  },

  oauthLogin(provider) {
    /* Real OAuth would redirect to provider. Here we simulate for local/PWA use. */
    const names = { google:'Google User', apple:'Apple User', microsoft:'Microsoft User', phone:'Phone User' };
    State.user = { id: provider + '_' + Date.now(), email: provider + '@user.com', method: provider, name: names[provider] };
    saveState();
    Auth.afterLogin();
  },

  emailLogin() {
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-pass').value;
    const err   = document.getElementById('login-error');
    if (!email || !pass) return showError(err, 'Please enter email and password.');
    if (!email.includes('@')) return showError(err, 'Please enter a valid email.');
    // Check stored account
    const stored = getStoredAccounts();
    const account = stored[email];
    if (!account) return showError(err, 'No account found. Please sign up first.');
    if (account.pass !== btoa(pass)) return showError(err, 'Incorrect password.');
    State.user = { id: email, email, method: 'email', name: email.split('@')[0] };
    saveState();
    Auth.afterLogin();
  },

  emailSignup() {
    const email = document.getElementById('signup-email').value.trim();
    const pass  = document.getElementById('signup-pass').value;
    const err   = document.getElementById('signup-error');
    if (!email || !pass) return showError(err, 'Please fill in all fields.');
    if (!email.includes('@')) return showError(err, 'Please enter a valid email.');
    if (pass.length < 6) return showError(err, 'Password must be at least 6 characters.');
    const stored = getStoredAccounts();
    if (stored[email]) return showError(err, 'Account already exists. Please sign in.');
    stored[email] = { pass: btoa(pass) };
    try { localStorage.setItem('wf_accounts', JSON.stringify(stored)); } catch(e) {}
    State.user = { id: email, email, method: 'email', name: email.split('@')[0] };
    saveState();
    Auth.afterLogin();
  },

  guestMode() {
    State.user = { id: 'guest_' + Date.now(), email: '', method: 'guest', name: 'Guest' };
    saveState();
    Auth.afterLogin();
  },

  afterLogin() {
    applyTheme(State.theme);
    if (State.weeklyPlan) {
      App.go('dashboard');
    } else {
      App.go('profile');
    }
  },

  signOut() {
    if (!confirm('Sign out? Your data stays saved on this device.')) return;
    State.user = null;
    saveState();
    App.go('auth');
  },
};

function getStoredAccounts() {
  try { return JSON.parse(localStorage.getItem('wf_accounts') || '{}'); } catch(e) { return {}; }
}

/* ════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════ */

function today()    { return new Date().toISOString().split('T')[0]; }
function todayDay() { return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()]; }
function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
function getWeekDates() {
  const now = new Date(), day = now.getDay();
  const mon = new Date(now); mon.setDate(now.getDate() - ((day + 6) % 7));
  return ALL_DAYS.map((_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); return d.toISOString().split('T')[0]; });
}
function calcStreak() {
  if (!State.completedDates.length) return 0;
  const sorted = [...new Set(State.completedDates)].sort().reverse();
  let streak = 0, check = new Date();
  for (const d of sorted) {
    const diff = Math.round((check - new Date(d)) / 86400000);
    if (diff <= 1) { streak++; check = new Date(d); } else break;
  }
  return streak;
}
function calcWeekPct() {
  const wkDates = getWeekDates();
  const done = wkDates.filter(d => State.completedDates.includes(d)).length;
  return State.workoutDays.length ? Math.round((done / State.workoutDays.length) * 100) : 0;
}
function showError(el, msg) {
  el.textContent = msg; el.classList.remove('hidden');
  el.scrollIntoView({ behavior:'smooth', block:'nearest' });
}
function applyTheme(t) { document.body.dataset.theme = t || 'dark'; }

/* ════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════ */

const App = {
  currentWorkout: null,
  previewDay:     null,

  init() {
    loadState();
    applyTheme(State.theme);

    if (!State.user) {
      App.go('auth');
    } else if (!State.weeklyPlan) {
      App.go('profile');
    } else {
      App.go('dashboard');
      // Ask for notifications if not yet asked
      if (!State.notifAsked) {
        setTimeout(() => App.go('notif-prompt'), 800);
      }
    }
  },

  go(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + screen);
    if (el) el.classList.add('active');

    if (screen === 'dashboard')    App.renderDashboard();
    if (screen === 'settings')     App.renderSettings();
    if (screen === 'edit-profile') App.populateEditProfile();
  },

  /* ── PILLS & CARDS ── */
  selectPill(btn, groupId) {
    document.querySelectorAll('#' + groupId + ' .pill').forEach(p => p.classList.remove('selected'));
    btn.classList.add('selected');
    if (groupId === 'intensity-group') App.previewRecommended();
  },

  selectCard(btn, groupId) {
    document.querySelectorAll('#' + groupId + ' .style-card, #' + groupId + ' .goal-card')
      .forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
  },

  /* ── PROFILE ── */
  submitProfile() {
    const age    = parseInt(document.getElementById('p-age').value);
    const weight = parseFloat(document.getElementById('p-weight').value);
    const height = parseFloat(document.getElementById('p-height').value);
    const gender = document.getElementById('p-gender').value;
    const expBtn = document.querySelector('#p-experience .pill.selected');
    const errEl  = document.getElementById('profile-error');
    if (!age || age < 13 || age > 99) return showError(errEl, 'Please enter a valid age (13–99).');
    if (!weight || weight < 30)       return showError(errEl, 'Please enter a valid weight.');
    if (!height || height < 100)      return showError(errEl, 'Please enter a valid height.');
    if (!gender)                      return showError(errEl, 'Please select a gender.');
    if (!expBtn)                      return showError(errEl, 'Please select your experience level.');
    errEl.classList.add('hidden');
    State.profile = { age, weight, height, gender, experience: expBtn.dataset.val };
    saveState();
    App.go('style');
  },

  submitStyle() {
    const sel  = document.querySelector('#style-cards .style-card.selected');
    const errEl = document.getElementById('style-error');
    if (!sel) return showError(errEl, 'Please select a training style.');
    errEl.classList.add('hidden');
    State.style = sel.dataset.val;
    saveState();
    App.go('goal');
  },

  submitGoal() {
    const sel  = document.querySelector('#goal-cards .goal-card.selected');
    const errEl = document.getElementById('goal-error');
    if (!sel) return showError(errEl, 'Please select a goal.');
    errEl.classList.add('hidden');
    State.goal = sel.dataset.val;
    saveState();
    App.go('schedule');
  },

  /* ── SCHEDULE ── */
  showRecommended() {
    document.getElementById('btn-recommended').classList.add('active');
    document.getElementById('btn-custom').classList.remove('active');
    document.getElementById('recommended-section').classList.remove('hidden');
    document.getElementById('custom-section').classList.add('hidden');
    State.scheduleMode = 'recommended';
  },
  showCustom() {
    document.getElementById('btn-custom').classList.add('active');
    document.getElementById('btn-recommended').classList.remove('active');
    document.getElementById('custom-section').classList.remove('hidden');
    document.getElementById('recommended-section').classList.add('hidden');
    State.scheduleMode = 'custom';
  },
  previewRecommended() {
    const intBtn = document.querySelector('#intensity-group .pill.selected');
    if (!intBtn) return;
    const days = getRecommendedDays(State.profile.experience, intBtn.dataset.val);
    const prev = document.getElementById('recommended-preview');
    prev.classList.remove('hidden');
    prev.innerHTML = '<div class="preview-days">' +
      ALL_DAYS.map(d => '<span class="preview-day ' + (days.includes(d) ? 'workout' : 'rest') + '">' + d + '</span>').join('') +
      '</div><p style="font-size:11px;color:var(--text2);margin-top:8px">' + days.length + ' days/week — based on ACSM frequency guidelines</p>';
  },
  toggleDay(btn) { btn.classList.toggle('selected'); },

  submitSchedule() {
    const errEl = document.getElementById('schedule-error');
    if (!State.scheduleMode) return showError(errEl, 'Please choose a schedule type.');
    let workoutDays = [];
    if (State.scheduleMode === 'recommended') {
      const intBtn = document.querySelector('#intensity-group .pill.selected');
      if (!intBtn) return showError(errEl, 'Please select a training intensity.');
      State.intensity = intBtn.dataset.val;
      workoutDays = getRecommendedDays(State.profile.experience, State.intensity);
    } else {
      workoutDays = [...document.querySelectorAll('#days-grid .day-btn.selected')].map(b => b.dataset.day);
      if (workoutDays.length < 2) return showError(errEl, 'Please select at least 2 workout days.');
    }
    errEl.classList.add('hidden');
    State.workoutDays = workoutDays;
    State.weeklyPlan  = generateWeeklyPlan(State.profile, State.style, State.goal, workoutDays);
    saveState();

    // Ask for notifications first
    if (!State.notifAsked) {
      App.go('notif-prompt');
    } else {
      App.go('dashboard');
    }
  },

  /* ── NOTIFICATION PERMISSION ── */
  async requestNotifPermission() {
    State.notifAsked = true;
    saveState();
    if (!('Notification' in window)) {
      alert('Your browser does not support notifications.');
      App.go('dashboard');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      // Show time picker
      App.go('notifications');
    } else {
      App.go('dashboard');
    }
  },
  skipNotif() {
    State.notifAsked = true;
    saveState();
    App.go('dashboard');
  },

  /* ── DASHBOARD ── */
  renderDashboard() {
    if (!State.weeklyPlan || !document.getElementById('stat-streak')) return;

    const dayKey  = todayDay();
    const dayData = State.weeklyPlan[dayKey];

    document.getElementById('dash-greeting').textContent = greeting();
    document.getElementById('dash-name').textContent     = State.user ? State.user.name : 'Athlete';
    document.getElementById('stat-streak').textContent   = calcStreak();
    document.getElementById('stat-total').textContent    = [...new Set(State.completedDates)].length;
    document.getElementById('stat-week').textContent     = calcWeekPct() + '%';

    /* Today card */
    const tag  = document.getElementById('today-tag');
    const name = document.getElementById('today-name');
    const exEl = document.getElementById('today-exercises');
    const card = document.getElementById('today-card');

    if (!dayData || dayData.type === 'rest') {
      tag.textContent   = 'Rest Day';
      name.textContent  = 'Recovery';
      exEl.textContent  = dayData ? dayData.scienceNote : 'Take it easy today 💤';
      card.onclick      = null;
      document.getElementById('today-arrow').style.display = 'none';
    } else {
      tag.textContent  = dayKey;
      name.textContent = dayData.name;
      exEl.textContent = dayData.exercises.slice(0, 4).map(e => e.name).join(' · ') + (dayData.exercises.length > 4 ? ' +more' : '');
      card.onclick     = () => App.openWorkout(dayKey, dayData);
      document.getElementById('today-arrow').style.display = 'block';
    }

    /* Week browseable cards */
    const weekDates = getWeekDates();
    const strip = document.getElementById('week-cards');
    strip.innerHTML = ALL_DAYS.map((d, i) => {
      const plan    = State.weeklyPlan[d];
      const date    = weekDates[i];
      const isToday = d === dayKey;
      const isDone  = State.completedDates.includes(date);
      const isWork  = plan && plan.type === 'workout';
      let cls = 'week-card' + (isToday ? ' today' : isDone ? ' done' : isWork ? ' workout-day' : '');
      const icon  = isDone ? '✅' : isWork ? '💪' : '😴';
      const label = isWork && plan ? plan.name.split(' ')[0] : 'Rest';
      return '<div class="' + cls + '" onclick="App.previewDay(\'' + d + '\')" role="button">' +
        '<div class="week-card-name">' + d + '</div>' +
        '<div class="week-card-icon">' + icon + '</div>' +
        '<div class="week-card-label">' + label + '</div>' +
        '</div>';
    }).join('');
  },

  /* ── DAY PREVIEW (browse any day) ── */
  previewDay(dayKey) {
    if (!State.weeklyPlan) return;
    const dayData = State.weeklyPlan[dayKey];
    App.previewDay._current = { dayKey, dayData };

    document.getElementById('preview-day-tag').textContent  = dayKey;
    document.getElementById('preview-day-name').textContent = dayData.name;
    document.getElementById('preview-day-meta').textContent = dayData.scienceNote || '';

    const startBtn = document.getElementById('preview-start-btn');
    const list = document.getElementById('preview-exercise-list');

    if (!dayData || dayData.type === 'rest') {
      startBtn.style.display = 'none';
      list.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--text2)">😴<br/><br/>Rest day — muscles rebuild during recovery.<br/>Active recovery: walk, stretch, or light yoga.</div>';
    } else {
      startBtn.style.display = 'block';
      startBtn.textContent = 'Start ' + dayData.name + ' →';
      list.innerHTML = dayData.exercises.map(ex =>
        '<div class="preview-ex-item">' +
          '<div class="preview-ex-name">' + ex.name + '</div>' +
          '<div class="preview-ex-meta">' + ex.sets + ' sets · ' + ex.reps + ' reps · Rest ' + ex.rest + '</div>' +
          '<div class="preview-ex-meta" style="margin-top:2px">' + (ex.muscle || '') + '</div>' +
          '<div class="preview-ex-science">' + (ex.science || '') + '</div>' +
          (ex.weight !== null ? '<div style="font-size:12px;color:var(--accent);margin-top:4px">Suggested: ' + ex.weight + 'kg</div>' : '') +
        '</div>'
      ).join('');
    }
    App.go('day-preview');
  },

  startPreviewWorkout() {
    const cur = App.previewDay._current;
    if (!cur || !cur.dayData || cur.dayData.type === 'rest') return;
    App.openWorkout(cur.dayKey, cur.dayData);
  },

  /* ── ACTIVE WORKOUT ── */
  openTodayWorkout() {
    const d = todayDay();
    App.openWorkout(d, State.weeklyPlan[d]);
  },

  openWorkout(dayKey, dayData) {
    if (!dayData || dayData.type === 'rest') return;
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
    list.innerHTML = dayData.exercises.map((ex, ei) => {
      const wKey    = dayKey + '-' + ei;
      const storedW = State.weights[wKey];
      const dispW   = storedW !== undefined ? storedW : ex.weight;
      const done    = App.allSetsDone(dayKey, ei, ex.sets);

      const setsHTML = Array.from({ length: ex.sets }, (_, si) => {
        const sKey  = dayKey + '-' + ei + '-' + si;
        const isDone = !!State.setStates[sKey];
        return '<div class="set-item">' +
          '<button class="set-btn ' + (isDone ? 'done' : '') + '" ' +
            'onclick="App.toggleSet(\'' + dayKey + '\',' + ei + ',' + si + ')" ' +
            'aria-label="Set ' + (si+1) + (isDone ? ' complete' : ' incomplete') + '">' +
            (isDone ? '✅' : '⭕') +
          '</button>' +
          '<div class="set-label">Set ' + (si+1) + '</div>' +
          '</div>';
      }).join('');

      const weightHTML = dispW !== null
        ? '<div class="ex-weight">' +
            '<div class="ex-weight-val">' + dispW + 'kg</div>' +
            '<button class="weight-edit-btn" onclick="App.editWeight(\'' + dayKey + '\',' + ei + ',' + dispW + ')">edit weight</button>' +
          '</div>'
        : '';

      return '<div class="exercise-card' + (done ? ' all-done' : '') + '" id="excard-' + ei + '">' +
        '<div class="ex-header">' +
          '<div>' +
            '<div class="ex-name">' + ex.name + '</div>' +
            '<div class="ex-meta">' + ex.sets + ' sets · ' + ex.reps + ' reps · Rest ' + ex.rest + '</div>' +
            '<div class="ex-meta" style="margin-top:2px">' + (ex.muscle || '') + '</div>' +
            '<div class="ex-science">' + (ex.science || '') + '</div>' +
          '</div>' +
          weightHTML +
        '</div>' +
        '<div class="sets-row">' + setsHTML + '</div>' +
        '</div>';
    }).join('');

    App.updateProgress();
  },

  allSetsDone(dayKey, ei, totalSets) {
    return Array.from({ length: totalSets }, (_, si) => !!State.setStates[dayKey + '-' + ei + '-' + si]).every(Boolean);
  },

  toggleSet(dayKey, ei, si) {
    const sKey = dayKey + '-' + ei + '-' + si;
    State.setStates[sKey] = !State.setStates[sKey];
    saveState();
    App.renderExercises();
  },

  editWeight(dayKey, ei, current) {
    const val = prompt('Enter weight (kg) for this exercise:', current);
    if (val !== null && !isNaN(+val) && +val >= 0) {
      State.weights[dayKey + '-' + ei] = +val;
      saveState();
      App.renderExercises();
    }
  },

  updateProgress() {
    if (!App.currentWorkout) return;
    const { dayKey, dayData } = App.currentWorkout;
    const totalSets = dayData.exercises.reduce((s, e) => s + e.sets, 0);
    const doneSets  = dayData.exercises.reduce((s, e, ei) =>
      s + Array.from({ length: e.sets }, (_, si) => State.setStates[dayKey + '-' + ei + '-' + si] ? 1 : 0)
             .reduce((a, b) => a + b, 0), 0);
    const pct = totalSets ? Math.round((doneSets / totalSets) * 100) : 0;
    document.getElementById('workout-progress-fill').style.width = pct + '%';
    const doneEx = dayData.exercises.filter((_, ei) => App.allSetsDone(dayKey, ei, dayData.exercises[ei].sets)).length;
    document.getElementById('workout-prog-text').textContent = doneEx + '/' + dayData.exercises.length;
  },

  finishWorkout() {
    if (!App.currentWorkout) return;
    const { dayKey, dayData } = App.currentWorkout;
    const dateStr = today();
    if (!State.completedDates.includes(dateStr)) State.completedDates.push(dateStr);
    saveState();

    const totalEx = dayData.exercises.length;
    const doneEx  = dayData.exercises.filter((_, ei) => App.allSetsDone(dayKey, ei, dayData.exercises[ei].sets)).length;
    const pct     = totalEx ? Math.round((doneEx / totalEx) * 100) : 100;

    document.getElementById('c-exercises').textContent = doneEx;
    document.getElementById('c-pct').textContent       = pct + '%';
    document.getElementById('c-streak').textContent    = calcStreak();
    document.getElementById('disclaimer').classList.add('hidden');
    App.go('complete');
  },

  /* ── EDIT PROFILE ── */
  populateEditProfile() {
    if (!State.profile) return;
    document.getElementById('ep-age').value    = State.profile.age    || '';
    document.getElementById('ep-weight').value = State.profile.weight || '';
    document.getElementById('ep-height').value = State.profile.height || '';
    document.getElementById('ep-gender').value = State.profile.gender || '';

    ['ep-experience','ep-style','ep-goal'].forEach(gid => {
      document.querySelectorAll('#' + gid + ' .pill').forEach(p => p.classList.remove('selected'));
    });
    const exp = document.querySelector('#ep-experience [data-val="' + State.profile.experience + '"]');
    if (exp) exp.classList.add('selected');
    const sty = document.querySelector('#ep-style [data-val="' + State.style + '"]');
    if (sty) sty.classList.add('selected');
    const gol = document.querySelector('#ep-goal [data-val="' + State.goal + '"]');
    if (gol) gol.classList.add('selected');
  },

  saveProfile() {
    const age    = parseInt(document.getElementById('ep-age').value);
    const weight = parseFloat(document.getElementById('ep-weight').value);
    const height = parseFloat(document.getElementById('ep-height').value);
    const gender = document.getElementById('ep-gender').value;
    const expBtn = document.querySelector('#ep-experience .pill.selected');
    const styBtn = document.querySelector('#ep-style .pill.selected');
    const golBtn = document.querySelector('#ep-goal .pill.selected');
    const errEl  = document.getElementById('ep-error');

    if (!age || age < 13) return showError(errEl, 'Please enter a valid age.');
    if (!weight || weight < 30) return showError(errEl, 'Please enter a valid weight.');
    if (!height || height < 100) return showError(errEl, 'Please enter a valid height.');
    if (!gender) return showError(errEl, 'Please select a gender.');
    if (!expBtn) return showError(errEl, 'Please select experience level.');
    if (!styBtn) return showError(errEl, 'Please select training style.');
    if (!golBtn) return showError(errEl, 'Please select a goal.');
    errEl.classList.add('hidden');

    State.profile = { age, weight, height, gender, experience: expBtn.dataset.val };
    State.style   = styBtn.dataset.val;
    State.goal    = golBtn.dataset.val;
    // Rebuild plan with existing schedule
    if (State.workoutDays.length) {
      State.weeklyPlan = generateWeeklyPlan(State.profile, State.style, State.goal, State.workoutDays);
    }
    saveState();
    alert('Profile saved! Your plan has been rebuilt.');
    App.go('settings');
  },

  /* ── NOTIFICATIONS ── */
  async saveReminder() {
    const timeBtn = document.querySelector('#reminder-time-group .pill.selected');
    const statusEl = document.getElementById('notif-status');

    if (!timeBtn) { alert('Please select a time.'); return; }
    State.reminderTime = timeBtn.dataset.val;
    saveState();

    if (!('Notification' in window)) {
      statusEl.textContent = '⚠️ Notifications not supported in this browser.';
      statusEl.classList.remove('hidden');
      return;
    }
    const perm = Notification.permission === 'granted'
      ? 'granted'
      : await Notification.requestPermission();

    if (perm !== 'granted') {
      statusEl.textContent = '⚠️ Permission denied. Enable notifications in your browser settings.';
      statusEl.classList.remove('hidden');
      return;
    }
    statusEl.classList.add('hidden');
    App.scheduleNotification(State.reminderTime);
    alert('Reminder set for ' + timeBtn.textContent + ' daily! ✅');
    App.go('settings');
  },

  scheduleNotification(time) {
    const [h, m] = time.split(':').map(Number);
    const now = new Date(), target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('WorkoutForge ⚡', {
          body: "Time to train! Open WorkoutForge to start today's session.",
          icon: './icon-192.png',
          badge: './icon-192.png',
        });
      }
      App.scheduleNotification(time);
    }, target - now);
  },

  /* ── SETTINGS ── */
  renderSettings() {
    const userEl = document.getElementById('settings-user');
    if (userEl && State.user) {
      userEl.textContent = State.user.method === 'guest'
        ? 'Guest (data saved locally)'
        : State.user.email || State.user.name || 'Logged in';
    }
    const remEl = document.getElementById('settings-reminder');
    if (remEl) {
      if (State.reminderTime) {
        const [h, m] = State.reminderTime.split(':');
        const d = new Date(); d.setHours(+h, +m);
        remEl.textContent = d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
      } else {
        remEl.textContent = 'Not set';
      }
    }
    App.renderThemePills();
  },

  renderThemePills() {
    document.getElementById('theme-dark').classList.toggle('selected', State.theme === 'dark');
    document.getElementById('theme-light').classList.toggle('selected', State.theme === 'light');
  },

  setTheme(t) {
    State.theme = t;
    applyTheme(t);
    saveState();
    App.renderThemePills();
  },

  exportData() {
    const blob = new Blob([JSON.stringify(State, null, 2)], { type:'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'workoutforge-' + today() + '.json';
    a.click(); URL.revokeObjectURL(url);
  },

  importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        Object.assign(State, data);
        saveState();
        applyTheme(State.theme);
        App.go('dashboard');
        alert('Data imported successfully!');
      } catch(_) {
        alert('Invalid file. Please use a WorkoutForge export.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  },

  resetData() {
    if (!confirm('Reset ALL data? This cannot be undone.')) return;
    try { localStorage.removeItem('wf_v2'); } catch(e) {}
    location.reload();
  },
};

/* ════════════════════════════════════════
   BOOT
   ════════════════════════════════════════ */
App.init();

/* Re-schedule notification on page load if time is saved */
if (State.reminderTime && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
  App.scheduleNotification(State.reminderTime);
}
