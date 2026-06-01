// =========================
// 常量配置
// =========================

const STORAGE_KEYS = {
  history: "fitnessWorkoutHistory",
  draft: "fitnessWorkoutDraft",
  templates: "fitnessWorkoutTemplates"
};

const BACKUP_VERSION = 2;

const TIMER_CONFIG = {
  draftSaveDelayMs: 300,
  deleteUndoMs: 6500
};

const restRecommendations = {
  "复合动作": 120,
  "孤立动作": 75,
  "有氧": 60,
  "核心": 60,
  "热身": 45,
  "拉伸": 30
};

const commonExerciseDefaults = {};
registerExerciseDefaults(["杠铃卧推", "哑铃卧推", "史密斯卧推", "器械推胸"], ["胸", "三头", "肩前束"], "复合动作", 120);
registerExerciseDefaults(["上斜杠铃卧推", "上斜哑铃卧推"], ["上胸", "三头", "肩前束"], "复合动作", 120);
registerExerciseDefaults(["绳索夹胸", "蝴蝶机夹胸"], ["胸"], "孤立动作", 75);
registerExerciseDefaults(["高位下拉", "引体向上"], ["背", "二头"], "复合动作", 120);
registerExerciseDefaults(["坐姿划船", "杠铃划船", "哑铃划船", "T 杠划船", "器械划船"], ["背", "二头"], "复合动作", 120);
registerExerciseDefaults(["直臂下压"], ["背"], "孤立动作", 75);
registerExerciseDefaults(["硬拉"], ["下背", "臀", "腿", "背"], "复合动作", 150);
registerExerciseDefaults(["哑铃推肩", "杠铃推举", "史密斯推肩", "阿诺德推举"], ["肩前束", "肩中束", "三头"], "复合动作", 120);
registerExerciseDefaults(["侧平举"], ["肩中束"], "孤立动作", 75);
registerExerciseDefaults(["反向飞鸟", "面拉"], ["肩后束", "上背"], "孤立动作", 75);
registerExerciseDefaults(["深蹲", "腿举", "箭步蹲", "保加利亚分腿蹲"], ["股四头肌", "臀", "核心"], "复合动作", 120);
registerExerciseDefaults(["腿屈伸"], ["股四头肌"], "孤立动作", 75);
registerExerciseDefaults(["腿弯举", "罗马尼亚硬拉"], ["腘绳肌", "臀"], "复合动作", 120);
registerExerciseDefaults(["提踵"], ["小腿"], "孤立动作", 75);
registerExerciseDefaults(["杠铃弯举", "哑铃弯举", "锤式弯举", "牧师椅弯举"], ["二头"], "孤立动作", 75);
registerExerciseDefaults(["绳索下压", "仰卧臂屈伸", "过顶臂屈伸"], ["三头"], "孤立动作", 75);
registerExerciseDefaults(["窄距卧推"], ["三头", "胸", "肩前束"], "复合动作", 120);
registerExerciseDefaults(["卷腹", "平板支撑", "悬垂举腿", "俄罗斯转体", "绳索卷腹", "死虫", "侧桥"], ["核心"], "核心", 60);
registerExerciseDefaults(["跑步机", "椭圆机", "动感单车", "爬楼机", "划船机"], ["有氧", "全身"], "有氧", 60);

const AI_ANALYSIS_REQUESTS = {
  full: [
    "今天训练质量如何？",
    "哪些动作下次可以加重量？",
    "哪些动作应该保持或降重量？",
    "动作稳定性、发力感和技术表现有什么问题？",
    "疼痛 / 不适信号是否需要调整训练安排？",
    "下次同部位训练应该怎么安排？"
  ],
  brief: [
    "今天训练质量如何？",
    "哪些动作下次可以加重量？",
    "哪些动作应该保持或降重量？",
    "疼痛 / 不适信号是否需要调整？"
  ]
};

const painRiskNatures = ["刺痛", "锐痛", "麻木", "放射痛", "关节不适"];
const painPartOptions = ["无", "颈", "斜方肌", "肩前侧", "肩后侧", "肘", "腕", "胸", "肋部", "上背", "下背", "腰", "髋", "臀", "大腿前侧", "大腿后侧", "膝", "小腿", "踝", "足底", "其他"];
const painLevelOptions = Array.from({ length: 11 }, (_, index) => String(index));

const tagConfigs = {
  bodyParts: {
    mode: "multi",
    options: ["胸", "上胸", "下胸", "背", "肩", "腿", "臀", "臂", "二头", "三头", "核心", "有氧", "全身"],
    defaultValue: ["胸"]
  },
  mainGoal: {
    mode: "single",
    options: ["增肌", "力量", "减脂", "恢复", "技术练习", "耐力", "冲 PR", "维持训练"],
    defaultValue: "增肌"
  },
  secondaryGoals: {
    mode: "multi",
    options: ["冲重量", "控动作", "找发力", "增加容量", "提高稳定性", "提高泵感", "减少代偿", "轻重量恢复", "补弱项", "打卡维持"],
    defaultValue: []
  },
  dailyStatus: {
    mode: "neutralExclusive",
    options: ["正常", "精力好", "精力很足", "疲劳", "很疲劳", "困", "状态兴奋", "专注好", "专注差", "压力大", "时间紧", "训练动力强", "训练动力低", "心情一般", "身体发沉"],
    defaultValue: ["正常"],
    neutral: ["正常"],
    defaultWhenEmpty: "正常"
  },
  sleepQuality: {
    mode: "single",
    options: ["睡眠好", "睡眠一般", "睡眠差"],
    defaultValue: "睡眠一般"
  },
  sleepEvents: {
    mode: "multi",
    options: ["睡眠不足", "熬夜", "失眠", "早醒", "午睡过", "睡太久", "起床困难"],
    defaultValue: []
  },
  nutritionStatus: {
    mode: "neutralExclusive",
    options: ["饮食正常", "空腹", "饭后不久", "吃太撑", "碳水充足", "碳水不足", "蛋白充足", "饮食不足", "训练前加餐", "胃不舒服", "低血糖感"],
    defaultValue: ["饮食正常"],
    neutral: ["饮食正常"],
    defaultWhenEmpty: "饮食正常"
  },
  hydrationStatus: {
    mode: "neutralExclusive",
    options: ["水分正常", "口渴", "喝水少", "出汗多", "出汗少", "天气热", "天气冷", "口干", "头有点晕"],
    defaultValue: ["水分正常"],
    neutral: ["水分正常"],
    defaultWhenEmpty: "水分正常"
  },
  supplements: {
    mode: "noneExclusive",
    options: ["无", "咖啡", "能量饮料", "氮泵", "肌酸", "蛋白粉", "电解质", "其他"],
    defaultValue: ["无"],
    defaultWhenEmpty: "无"
  },
  recoveryStatus: {
    mode: "single",
    options: ["恢复良好", "恢复一般", "恢复差"],
    defaultValue: "恢复一般"
  },
  sorenessParts: {
    mode: "noneExclusive",
    options: ["无", "胸酸", "背酸", "肩酸", "腿酸", "臀酸", "手臂酸", "核心酸", "全身酸"],
    defaultValue: ["无"],
    defaultWhenEmpty: "无"
  },
  trainingEnvironment: {
    mode: "neutralExclusive",
    options: ["正常", "人多", "器械等待", "临时换动作", "时间充足", "时间紧", "健身房拥挤", "状态被打断", "设备不熟悉", "器械不可用", "训练节奏顺", "训练节奏乱"],
    defaultValue: ["正常"],
    neutral: ["正常"],
    defaultWhenEmpty: "正常",
    exclusivePairs: [["时间充足", "时间紧"], ["训练节奏顺", "训练节奏乱"]]
  },
  prePainParts: {
    mode: "noneExclusive",
    options: painPartOptions,
    defaultValue: ["无"],
    defaultWhenEmpty: "无"
  },
  prePainLevel: {
    mode: "single",
    options: painLevelOptions,
    defaultValue: "0"
  },
  targetMuscles: {
    mode: "multi",
    options: ["胸", "上胸", "下胸", "背", "上背", "下背", "肩前束", "肩中束", "肩后束", "腿", "臀", "股四头肌", "腘绳肌", "小腿", "二头", "三头", "核心", "有氧", "全身"],
    defaultValue: ["胸"]
  },
  exerciseType: {
    mode: "single",
    options: ["复合动作", "孤立动作", "有氧", "核心", "热身", "拉伸"],
    defaultValue: "复合动作"
  },
  stability: {
    mode: "single",
    options: ["很稳", "稳定", "一般", "晃动", "失控"],
    defaultValue: "稳定"
  },
  feeling: {
    mode: "single",
    options: ["轻松", "正常", "吃力", "接近力竭", "力竭"],
    defaultValue: "正常"
  },
  rir: {
    mode: "single",
    options: ["0", "1", "2", "3+"],
    defaultValue: "2"
  },
  rpe: {
    mode: "single",
    options: ["6", "7", "8", "9", "10"],
    defaultValue: "",
    optional: true
  },
  force: {
    mode: "neutralExclusive",
    options: ["目标肌明显", "泵感强", "一般", "代偿明显", "关节不适", "左右不平衡", "控制感好", "控制感差", "拉伸感明显", "顶峰收缩明显"],
    defaultValue: ["一般"],
    neutral: ["一般"],
    defaultWhenEmpty: "一般",
    exclusivePairs: [["控制感好", "控制感差"]]
  },
  technique: {
    mode: "neutralExclusive",
    options: ["动作标准", "动作变形", "幅度不足", "节奏太快", "节奏稳定", "离心控制好", "离心控制差", "借力明显", "呼吸混乱", "核心不稳", "握力不足", "左右不平衡"],
    defaultValue: ["动作标准"],
    neutral: ["动作标准"],
    defaultWhenEmpty: "动作标准",
    exclusivePairs: [["节奏稳定", "节奏太快"], ["离心控制好", "离心控制差"]]
  },
  setType: {
    mode: "single",
    options: ["热身组", "正式组", "顶组", "回退组", "递减组", "冲刺组", "力竭组", "补量组"],
    defaultValue: "正式组"
  },
  setPainTiming: {
    mode: "single",
    options: ["无", "动作开始就有", "训练中出现", "本组后出现", "热身后缓解", "训练后加重"],
    defaultValue: "无"
  },
  setPainParts: {
    mode: "noneExclusive",
    options: painPartOptions,
    defaultValue: ["无"],
    defaultWhenEmpty: "无"
  },
  setPainNature: {
    mode: "noneExclusive",
    options: ["无", "酸胀", "刺痛", "锐痛", "钝痛", "麻木", "放射痛", "牵拉感", "卡住感", "灼热感", "关节不适", "肌肉抽筋"],
    defaultValue: ["无"],
    defaultWhenEmpty: "无"
  },
  setPainLevel: {
    mode: "single",
    options: painLevelOptions,
    defaultValue: "0"
  },
  painActions: {
    mode: "multi",
    options: ["继续完成", "降低重量", "减少次数", "减少组数", "更换动作", "停止该动作", "停止训练"],
    defaultValue: []
  },
  postFeeling: {
    mode: "neutralExclusive",
    options: ["正常", "状态不错", "疲劳明显", "非常累", "泵感强", "没练透", "动作质量好", "动作质量差", "训练被打断", "时间不够"],
    defaultValue: ["正常"],
    neutral: ["正常"],
    defaultWhenEmpty: "正常"
  },
  postPainParts: {
    mode: "noneExclusive",
    options: painPartOptions,
    defaultValue: ["无"],
    defaultWhenEmpty: "无"
  },
  postPainLevel: {
    mode: "single",
    options: painLevelOptions,
    defaultValue: "0"
  }
};

// =========================
// 状态数据
// =========================

const todayRecords = [];
let workoutStartedAt = null;
let historyRecords = loadHistory();
let trainingTemplates = loadTemplates();
let expandedHistoryId = null;
let tagValues = {};
let activeExerciseName = "";
let pendingDelete = null;
let draftSaveTimer = null;
let isApplyingDraft = false;
let draftRestorePending = false;
let currentWorkoutId = createId();
let workoutSaved = false;
let targetMusclesManuallyEdited = false;
let exerciseDetailsOpenOverrides = new Map();
let currentAiVersion = "full";
let pendingPainConfirm = null;

const timerState = {
  remaining: restRecommendations["复合动作"],
  intervalId: null,
  running: false
};

// =========================
// DOM 引用
// =========================

const dom = {
  workoutDate: document.getElementById("workoutDate"),
  dailyNote: document.getElementById("dailyNote"),
  prePainNote: document.getElementById("prePainNote"),
  exerciseSelect: document.getElementById("exerciseSelect"),
  exerciseManual: document.getElementById("exerciseManual"),
  plannedSets: document.getElementById("plannedSets"),
  defaultRest: document.getElementById("defaultRest"),
  lastPerformanceHint: document.getElementById("lastPerformanceHint"),
  templateName: document.getElementById("templateName"),
  templateSelect: document.getElementById("templateSelect"),
  saveTemplateBtn: document.getElementById("saveTemplateBtn"),
  useTemplateBtn: document.getElementById("useTemplateBtn"),
  deleteTemplateBtn: document.getElementById("deleteTemplateBtn"),
  currentSetLabel: document.getElementById("currentSetLabel"),
  weightInput: document.getElementById("weightInput"),
  repsInput: document.getElementById("repsInput"),
  setNote: document.getElementById("setNote"),
  setPainNote: document.getElementById("setPainNote"),
  setPainWarning: document.getElementById("setPainWarning"),
  draftRestore: document.getElementById("draftRestore"),
  draftSummary: document.getElementById("draftSummary"),
  continueDraftBtn: document.getElementById("continueDraftBtn"),
  discardDraftBtn: document.getElementById("discardDraftBtn"),
  clearCurrentExerciseBtn: document.getElementById("clearCurrentExerciseBtn"),
  copyLastSetBtn: document.getElementById("copyLastSetBtn"),
  completeSetBtn: document.getElementById("completeSetBtn"),
  restContext: document.getElementById("restContext"),
  timerDisplay: document.getElementById("timerDisplay"),
  timerMessage: document.getElementById("timerMessage"),
  startRestBtn: document.getElementById("startRestBtn"),
  pauseRestBtn: document.getElementById("pauseRestBtn"),
  addRestBtn: document.getElementById("addRestBtn"),
  minusRestBtn: document.getElementById("minusRestBtn"),
  skipRestBtn: document.getElementById("skipRestBtn"),
  recordsList: document.getElementById("recordsList"),
  summaryDuration: document.getElementById("summaryDuration"),
  summarySets: document.getElementById("summarySets"),
  summaryReps: document.getElementById("summaryReps"),
  summaryVolume: document.getElementById("summaryVolume"),
  summaryBestSet: document.getElementById("summaryBestSet"),
  summaryE1rm: document.getElementById("summaryE1rm"),
  summaryPr: document.getElementById("summaryPr"),
  summaryStatusTags: document.getElementById("summaryStatusTags"),
  summaryPainRisk: document.getElementById("summaryPainRisk"),
  nextTrainingNote: document.getElementById("nextTrainingNote"),
  saveTodayBtn: document.getElementById("saveTodayBtn"),
  viewHistoryBtn: document.getElementById("viewHistoryBtn"),
  exportBackupBtn: document.getElementById("exportBackupBtn"),
  importBackupBtn: document.getElementById("importBackupBtn"),
  backupImportInput: document.getElementById("backupImportInput"),
  historySearch: document.getElementById("historySearch"),
  clearTodayBtn: document.getElementById("clearTodayBtn"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  historyList: document.getElementById("historyList"),
  copyAiBriefBtn: document.getElementById("copyAiBriefBtn"),
  copyAiFullBtn: document.getElementById("copyAiFullBtn"),
  aiModeLabel: document.getElementById("aiModeLabel"),
  aiOutput: document.getElementById("aiOutput"),
  copyStatus: document.getElementById("copyStatus"),
  undoToast: document.getElementById("undoToast"),
  undoMessage: document.getElementById("undoMessage"),
  undoDeleteBtn: document.getElementById("undoDeleteBtn")
};

init();

// =========================
// 初始化
// =========================

function init() {
  dom.workoutDate.value = getTodayDateString();
  dom.exerciseSelect.value = "杠铃卧推";
  setupTagGroups();
  setRecommendedRest();
  timerState.remaining = getDefaultRestSeconds();
  activeExerciseName = getCurrentExerciseName();
  syncExerciseSourceState();
  bindEvents();
  updateTimerDisplay();
  updateSetPainWarning();
  renderWorkoutUi({ includeHistory: true, refreshAi: false });
  renderTemplateOptions();
  updateSaveButtonState();
  checkForDraft();

  setInterval(updateSummary, 1000);
}

// =========================
// 标签系统
// =========================

function setupTagGroups() {
  document.querySelectorAll(".tag-group").forEach((group) => {
    const field = group.dataset.field;
    const config = tagConfigs[field];
    if (!config) return;

    tagValues[field] = cloneDefaultValue(config);
    group.innerHTML = config.options.map((option) => (
      `<button type="button" class="tag-button" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`
    )).join("");

    updateTagGroup(field);
  });

  updateOtherInputs();
}

// =========================
// 事件绑定
// =========================

function bindEvents() {
  bindGlobalEvents();
  bindExerciseEvents();
  bindCurrentSetEvents();
  bindTimerEvents();
  bindRecordsEvents();
  bindHistoryEvents();
  bindTemplateEvents();
  bindBackupEvents();
  bindAiEvents();
  bindDraftEvents();
}

function bindGlobalEvents() {
  document.addEventListener("click", handleTagClick);
  document.addEventListener("click", handleQuickAdjustClick);
  document.addEventListener("input", handleDraftInput);
  document.addEventListener("change", handleDraftInput);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveDraftImmediately();
    }
  });
  window.addEventListener("pagehide", saveDraftImmediately);
  window.addEventListener("beforeunload", saveDraftImmediately);
}

function bindExerciseEvents() {
  dom.exerciseSelect.addEventListener("change", () => {
    if (dom.exerciseSelect.value && dom.exerciseManual.value.trim()) {
      dom.exerciseManual.value = "";
    }
    syncExerciseSourceState();
    handleExerciseIdentityChange();
    applySelectedExerciseDefaults();
    renderWorkoutUi({ refreshAi: false });
  });
  dom.exerciseManual.addEventListener("input", () => {
    if (dom.exerciseManual.value.trim()) {
      dom.exerciseSelect.value = "";
    }
    syncExerciseSourceState();
    handleExerciseIdentityChange();
    if (!dom.exerciseManual.value.trim()) {
      applySelectedExerciseDefaults();
    }
    renderWorkoutUi({ refreshAi: false });
  });
  dom.plannedSets.addEventListener("input", () => {
    renderWorkoutUi({ refreshAi: false });
  });
}

function bindCurrentSetEvents() {
  dom.defaultRest.addEventListener("input", syncTimerWithDefaultRest);
  dom.copyLastSetBtn.addEventListener("click", copyLastSet);
  dom.completeSetBtn.addEventListener("click", completeCurrentSet);
  dom.clearCurrentExerciseBtn.addEventListener("click", clearCurrentExerciseRecords);
}

function bindTimerEvents() {
  dom.startRestBtn.addEventListener("click", () => startRestTimer(getDefaultRestSeconds()));
  dom.pauseRestBtn.addEventListener("click", togglePauseTimer);
  dom.addRestBtn.addEventListener("click", () => adjustTimer(30));
  dom.minusRestBtn.addEventListener("click", () => adjustTimer(-15));
  dom.skipRestBtn.addEventListener("click", skipRest);
}

function bindRecordsEvents() {
  dom.recordsList.addEventListener("click", handleRecordActions);
  dom.recordsList.addEventListener("toggle", handleRecordDetailsToggle, true);
}

function bindHistoryEvents() {
  dom.saveTodayBtn.addEventListener("click", saveTodayWorkout);
  dom.viewHistoryBtn.addEventListener("click", toggleHistory);
  dom.historySearch.addEventListener("input", renderHistory);
  dom.clearTodayBtn.addEventListener("click", clearTodayWorkout);
  dom.clearHistoryBtn.addEventListener("click", clearHistory);
  dom.historyList.addEventListener("click", handleHistoryClick);
}

function bindTemplateEvents() {
  dom.saveTemplateBtn.addEventListener("click", saveCurrentTemplate);
  dom.useTemplateBtn.addEventListener("click", useSelectedTemplate);
  dom.deleteTemplateBtn.addEventListener("click", deleteSelectedTemplate);
}

function bindBackupEvents() {
  dom.exportBackupBtn.addEventListener("click", exportBackup);
  dom.importBackupBtn.addEventListener("click", () => dom.backupImportInput.click());
  dom.backupImportInput.addEventListener("change", importBackup);
}

function bindAiEvents() {
  dom.copyAiBriefBtn.addEventListener("click", () => generateAndCopyAiText("brief"));
  dom.copyAiFullBtn.addEventListener("click", () => generateAndCopyAiText("full"));
}

function bindDraftEvents() {
  dom.continueDraftBtn.addEventListener("click", continueDraft);
  dom.discardDraftBtn.addEventListener("click", discardDraft);
  dom.undoDeleteBtn.addEventListener("click", undoLastDelete);
}

function handleTagClick(event) {
  const button = event.target.closest(".tag-button");
  if (!button) return;

  const group = button.closest(".tag-group");
  if (!group) return;

  const field = group.dataset.field;
  const config = tagConfigs[field];
  if (!config) return;

  const value = button.dataset.value;

  if (config.mode === "single") {
    tagValues[field] = config.optional && tagValues[field] === value ? "" : value;
  } else {
    let values = normalizeArray(tagValues[field]);
    const isActive = values.includes(value);

    if (isActive) {
      values = values.filter((item) => item !== value);
    } else {
      values = values.concat(value);
    }

    tagValues[field] = sanitizeTagValues(config, values, value);
  }

  updateTagGroup(field);
  updateOtherInputs();
  handleTagSideEffects(field);
  if (field === "targetMuscles") {
    targetMusclesManuallyEdited = true;
  }
  markWorkoutDirty();
  refreshGeneratedAiText();
  scheduleDraftSave();
}

function handleQuickAdjustClick(event) {
  const button = event.target.closest("[data-adjust-field]");
  if (!button) return;

  const field = button.dataset.adjustField;
  const delta = Number(button.dataset.adjust) || 0;
  const input = field === "weight" ? dom.weightInput : dom.repsInput;
  if (!input) return;

  const current = Number(input.value) || 0;
  const min = field === "weight" ? 0 : 0;
  const next = Math.max(min, current + delta);
  input.value = field === "weight" ? formatInputNumber(next) : String(Math.round(next));
  updateSummary();
  markWorkoutDirty();
  refreshGeneratedAiText();
  scheduleDraftSave();
}

function handleTagSideEffects(field) {
  if (field === "exerciseType") {
    setRecommendedRest();
    syncTimerWithDefaultRest();
  }

  if (["setPainTiming", "setPainParts", "setPainNature", "setPainLevel"].includes(field)) {
    updateSetPainWarning();
  }

  if (["exerciseType", "targetMuscles", "bodyParts", "mainGoal", "dailyStatus", "sleepQuality", "sleepEvents", "nutritionStatus", "hydrationStatus", "recoveryStatus", "sorenessParts", "prePainParts", "prePainLevel", "postFeeling", "postPainParts", "postPainLevel"].includes(field)) {
    updateSummary();
    renderRecords();
  }

  updateCurrentSetLabel();
  updateRestContext();
}

function updateTagGroup(field) {
  const group = document.querySelector(`.tag-group[data-field="${field}"]`);
  if (!group) return;

  const config = tagConfigs[field];
  const values = isMultiTagMode(config) ? normalizeArray(tagValues[field]) : [tagValues[field]];

  group.querySelectorAll(".tag-button").forEach((button) => {
    button.classList.toggle("active", values.includes(button.dataset.value));
  });
}

function setTagValue(field, value) {
  if (!tagConfigs[field]) return;
  const config = tagConfigs[field];
  tagValues[field] = isMultiTagMode(config)
    ? sanitizeTagValues(config, normalizeArray(value))
    : Array.isArray(value) ? value[0] || "" : value;
  updateTagGroup(field);
  updateOtherInputs();
  handleTagSideEffects(field);
  scheduleDraftSave();
}

function isMultiTagMode(config) {
  return ["multi", "noneExclusive", "neutralExclusive"].includes(config.mode);
}

function sanitizeTagValues(config, values, changedValue = "") {
  let nextValues = normalizeArray(values).filter((value, index, array) => array.indexOf(value) === index);

  if (config.mode === "noneExclusive") {
    if (changedValue === "无") {
      nextValues = nextValues.includes("无") ? ["无"] : [];
    } else if (changedValue && changedValue !== "无") {
      nextValues = nextValues.filter((item) => item !== "无");
    } else if (nextValues.includes("无") && nextValues.length > 1) {
      nextValues = nextValues.filter((item) => item !== "无");
    }
  }

  if (config.mode === "neutralExclusive") {
    const neutralValues = config.neutral || [];
    if (neutralValues.includes(changedValue)) {
      nextValues = nextValues.filter((item) => neutralValues.includes(item));
    } else if (changedValue) {
      nextValues = nextValues.filter((item) => !neutralValues.includes(item));
    } else if (nextValues.some((item) => neutralValues.includes(item)) && nextValues.length > 1) {
      nextValues = nextValues.filter((item) => !neutralValues.includes(item));
    }
  }

  nextValues = applyExclusivePairs(nextValues, config.exclusivePairs || [], changedValue);

  if (nextValues.length === 0 && config.defaultWhenEmpty) {
    nextValues = [config.defaultWhenEmpty];
  }

  return nextValues;
}

function applyExclusivePairs(values, pairs, changedValue) {
  let nextValues = [...values];
  pairs.forEach(([left, right]) => {
    if (changedValue === left) {
      nextValues = nextValues.filter((item) => item !== right);
    } else if (changedValue === right) {
      nextValues = nextValues.filter((item) => item !== left);
    } else if (nextValues.includes(left) && nextValues.includes(right)) {
      nextValues = nextValues.filter((item) => item !== right);
    }
  });
  return nextValues;
}

function updateOtherInputs() {
  document.querySelectorAll("[data-other-for]").forEach((input) => {
    const field = input.dataset.otherFor;
    const values = normalizeArray(tagValues[field]);
    input.classList.toggle("hidden", !values.includes("其他"));
  });
}

// =========================
// 当前动作与当前组
// =========================

function handleExerciseIdentityChange() {
  if (isApplyingDraft) return;

  const previousExerciseName = activeExerciseName;
  const nextExerciseName = getCurrentExerciseName();
  if (nextExerciseName === activeExerciseName) return;

  if (hasCurrentSetDraft()) {
    showNotice("已清空未保存的当前组草稿");
  }

  activeExerciseName = nextExerciseName;
  setExerciseDetailsOpen(previousExerciseName, false);
  setExerciseDetailsOpen(nextExerciseName, shouldAutoOpenExercise(nextExerciseName));
  targetMusclesManuallyEdited = false;
  resetCurrentSetForm();
}

function hasCurrentSetDraft() {
  return Boolean(
    dom.weightInput.value ||
    dom.repsInput.value ||
    dom.setNote.value.trim() ||
    dom.setPainNote.value.trim() ||
    getSingleValue("rpe") ||
    getSingleValue("setPainTiming", "无") !== "无" ||
    Number(getSingleValue("setPainLevel", "0")) > 0 ||
    hasMeaningfulValues(getMultiValueWithOther("setPainParts")) ||
    hasMeaningfulValues(getMultiValueWithOther("setPainNature")) ||
    hasMeaningfulValues(getMultiValueWithOther("painActions"))
  );
}

function resetCurrentSetForm() {
  dom.weightInput.value = "";
  dom.repsInput.value = "";
  dom.setNote.value = "";
  dom.setPainNote.value = "";
  setTagValue("stability", "稳定");
  setTagValue("feeling", "正常");
  setTagValue("rir", "2");
  setTagValue("rpe", "");
  setTagValue("force", ["一般"]);
  setTagValue("technique", ["动作标准"]);
  setTagValue("setType", "正式组");
  setTagValue("setPainTiming", "无");
  setTagValue("setPainParts", ["无"]);
  setTagValue("setPainNature", ["无"]);
  setTagValue("setPainLevel", "0");
  setTagValue("painActions", []);
  collapseSetPanels();
  resetRestTimer();
  updateSetPainWarning();
  updateCurrentSetLabel();
  updateRestContext();
  scheduleDraftSave();
}

function resetRestTimer() {
  clearTimerInterval();
  timerState.running = false;
  timerState.remaining = getDefaultRestSeconds();
  updateTimerDisplay();
  setTimerMessage("已重置休息计时器");
}

function collapseSetPanels() {
  document.querySelectorAll("#set-section details").forEach((details) => {
    details.open = false;
  });
}

function scrollToTimer() {
  document.getElementById("timer-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

function getCurrentExerciseName() {
  const manualName = dom.exerciseManual.value.trim();
  return manualName || dom.exerciseSelect.value;
}

function syncExerciseSourceState() {
  dom.exerciseSelect.classList.toggle("exercise-source-muted", Boolean(dom.exerciseManual.value.trim()));
}

function applySelectedExerciseDefaults() {
  if (isApplyingDraft || dom.exerciseManual.value.trim()) return;

  const defaults = commonExerciseDefaults[dom.exerciseSelect.value];
  if (!defaults) return;

  if (!targetMusclesManuallyEdited) {
    setTagValue("targetMuscles", defaults.targetMuscles);
  }

  setTagValue("exerciseType", defaults.exerciseType);
  dom.defaultRest.value = defaults.defaultRestSeconds;
  syncTimerWithDefaultRest();
  scheduleDraftSave();
}

function getCurrentExerciseSettings() {
  return {
    exerciseName: getCurrentExerciseName(),
    targetMuscles: getMultiValueWithOther("targetMuscles"),
    exerciseType: getSingleValue("exerciseType", "复合动作"),
    plannedSets: Math.max(1, Number(dom.plannedSets.value) || 1),
    defaultRestSeconds: getDefaultRestSeconds()
  };
}

function getDefaultRestSeconds() {
  return Math.max(0, Number(dom.defaultRest.value) || 0);
}

function setRecommendedRest() {
  const exerciseType = getSingleValue("exerciseType", "复合动作");
  dom.defaultRest.value = restRecommendations[exerciseType] || 60;
}

function syncTimerWithDefaultRest() {
  if (timerState.running) return;
  timerState.remaining = getDefaultRestSeconds();
  updateTimerDisplay();
  updateRestContext();
  scheduleDraftSave();
}

function updateCurrentSetLabel() {
  const settings = getCurrentExerciseSettings();
  const currentSet = getNextSetNumber(settings.exerciseName);
  dom.currentSetLabel.textContent = `第 ${currentSet} / ${settings.plannedSets} 组`;
}

function updateRestContext() {
  const settings = getCurrentExerciseSettings();
  const nextSet = getNextSetNumber(settings.exerciseName);
  dom.restContext.textContent = `当前动作：${settings.exerciseName || "未选择"} · 下一组：第 ${nextSet} / ${settings.plannedSets} 组`;
}

function updateLastPerformanceHint() {
  const exerciseName = getCurrentExerciseName();
  const performance = findLastExercisePerformance(exerciseName);

  if (!performance) {
    dom.lastPerformanceHint.classList.add("hidden");
    dom.lastPerformanceHint.textContent = "";
    return;
  }

  dom.lastPerformanceHint.textContent = `上次${exerciseName}：${performance.date}，最佳组 ${formatNumber(performance.bestSet.weight)}kg × ${performance.bestSet.reps}，最高 e1RM ${formatNumber(performance.e1rm)}kg，${performance.totalSets} 组`;
  dom.lastPerformanceHint.classList.remove("hidden");
}

function findLastExercisePerformance(exerciseName) {
  if (!exerciseName) return null;

  const sortedHistory = [...historyRecords].sort((a, b) => {
    const aTime = new Date(a.savedAt || a.info?.date || 0).getTime();
    const bTime = new Date(b.savedAt || b.info?.date || 0).getTime();
    return bTime - aTime;
  });

  for (const workout of sortedHistory) {
    const records = (workout.records || []).filter((record) => record.exerciseName === exerciseName);
    if (records.length === 0) continue;

    const stats = calculateExerciseStats(records);
    return {
      date: normalizeInfo(workout.info || {}).date || "未记录日期",
      bestSet: stats.bestSet,
      e1rm: stats.highestE1rmSet ? getE1rm(stats.highestE1rmSet) : 0,
      totalSets: records.length
    };
  }

  return null;
}

function getNextSetNumber(exerciseName) {
  return todayRecords.filter((record) => record.exerciseName === exerciseName).length + 1;
}

function getCompletedSetCount(exerciseName) {
  return todayRecords.filter((record) => record.exerciseName === exerciseName).length;
}

function completeCurrentSet() {
  const settings = getCurrentExerciseSettings();
  const weightText = dom.weightInput.value.trim();
  const repsText = dom.repsInput.value.trim();
  const weight = weightText === "" ? 0 : Number(weightText);
  const reps = repsText === "" ? 0 : Number(repsText);
  const validation = validateCurrentSetBeforeComplete(settings, weightText, repsText, weight, reps);

  if (!validation.ok) {
    showNotice(validation.message);
    if (validation.focusTarget) validation.focusTarget.focus();
    return;
  }
  pendingPainConfirm = null;

  if (!workoutStartedAt) {
    workoutStartedAt = Date.now();
  }

  const record = buildCurrentSetRecord(settings, weight, reps);
  commitCurrentSetRecord(record, settings);
}

function buildCurrentSetRecord(settings, weight, reps) {
  return {
    id: createId(),
    createdAt: new Date().toISOString(),
    ...settings,
    setNumber: getNextSetNumber(settings.exerciseName),
    weight,
    reps,
    stability: getSingleValue("stability", "未记录"),
    feeling: getSingleValue("feeling", "未记录"),
    rir: getSingleValue("rir"),
    rpe: getSingleValue("rpe") || "未填",
    force: getMultiValueWithOther("force"),
    technique: getMultiValueWithOther("technique"),
    setType: getSingleValue("setType", "正式组"),
    note: dom.setNote.value.trim(),
    pain: getCurrentSetPain()
  };
}

function commitCurrentSetRecord(record, settings) {
  todayRecords.push(record);
  if (getCompletedSetCount(settings.exerciseName) >= settings.plannedSets) {
    setExerciseDetailsOpen(settings.exerciseName, false);
  }
  markWorkoutDirty();
  prepareNextSet(record);
  renderWorkoutUi();
  startRestTimer(settings.defaultRestSeconds);
  collapseSetPanels();
  scrollToTimer();
  scheduleDraftSave();
}

function validateCurrentSetBeforeComplete(settings, weightText, repsText, weight, reps) {
  if (!settings.exerciseName) {
    return { ok: false, message: "请填写动作名称", focusTarget: dom.exerciseManual };
  }

  if (!weightText && !repsText) {
    return { ok: false, message: "请先填写重量或次数", focusTarget: dom.repsInput };
  }

  if (weightText && (!Number.isFinite(weight) || weight < 0)) {
    return { ok: false, message: "请填写有效重量", focusTarget: dom.weightInput };
  }

  if (repsText && (!Number.isFinite(reps) || reps < 0)) {
    return { ok: false, message: "请填写有效次数", focusTarget: dom.repsInput };
  }

  if (["复合动作", "孤立动作"].includes(settings.exerciseType)) {
    if (!weightText) return { ok: false, message: "请先填写重量", focusTarget: dom.weightInput };
    if (!repsText || reps <= 0) return { ok: false, message: "请先填写次数", focusTarget: dom.repsInput };
  }

  if (!getSingleValue("rir")) {
    return { ok: false, message: "请先选择 RIR" };
  }

  const pain = getCurrentSetPain();
  if (Number(pain.level || 0) >= 4 && !hasMeaningfulValues(pain.actions)) {
    return { ok: false, message: "疼痛程度较高，请补充应对方式" };
  }

  if (isPainRisk(pain)) {
    const confirmKey = JSON.stringify(pain);
    const now = Date.now();
    if (!pendingPainConfirm || pendingPainConfirm.key !== confirmKey || now - pendingPainConfirm.at > 5000) {
      pendingPainConfirm = { key: confirmKey, at: now };
      return { ok: false, message: "本组存在明显不适，再次点击完成本组继续记录" };
    }
  }

  return { ok: true };
}

function getCurrentSetPain() {
  return {
    timing: getSingleValue("setPainTiming", "无"),
    parts: getMultiValueWithOther("setPainParts"),
    nature: getMultiValueWithOther("setPainNature"),
    level: Number(getSingleValue("setPainLevel", "0")) || 0,
    actions: getMultiValueWithOther("painActions"),
    note: dom.setPainNote.value.trim()
  };
}

function prepareNextSet(lastRecord) {
  dom.weightInput.value = lastRecord.weight;
  dom.repsInput.value = "";
  dom.setNote.value = "";
  dom.setPainNote.value = "";
  setTagValue("rpe", "");
  setTagValue("setPainTiming", "无");
  setTagValue("setPainParts", ["无"]);
  setTagValue("setPainNature", ["无"]);
  setTagValue("setPainLevel", "0");
  setTagValue("painActions", []);
  updateSetPainWarning();
}

function copyLastSet() {
  const exerciseName = getCurrentExerciseName();
  const lastRecord = [...todayRecords].reverse().find((record) => record.exerciseName === exerciseName);

  if (!lastRecord) {
    showNotice("当前动作还没有上一组可复制。");
    return;
  }

  dom.weightInput.value = lastRecord.weight;
  dom.repsInput.value = lastRecord.reps;
  dom.setNote.value = "";
  dom.setPainNote.value = "";
  setTagValue("stability", lastRecord.stability);
  setTagValue("feeling", lastRecord.feeling);
  setTagValue("rir", lastRecord.rir);
  setTagValue("rpe", lastRecord.rpe === "未填" ? "" : lastRecord.rpe);
  setTagValue("force", normalizeArray(lastRecord.force));
  setTagValue("technique", normalizeArray(lastRecord.technique));
  setTagValue("setType", lastRecord.setType || "正式组");
  setTagValue("setPainTiming", "无");
  setTagValue("setPainParts", ["无"]);
  setTagValue("setPainNature", ["无"]);
  setTagValue("setPainLevel", "0");
  setTagValue("painActions", []);
  updateSetPainWarning();
  markWorkoutDirty();
  scheduleDraftSave();
}

// =========================
// 休息计时器
// =========================

function startRestTimer(seconds) {
  clearTimerInterval();
  timerState.remaining = Math.max(0, Number(seconds) || 0);
  updateRestContext();

  if (timerState.remaining <= 0) {
    finishRest();
    return;
  }

  timerState.running = true;
  setTimerMessage("休息中");
  updateTimerDisplay();

  timerState.intervalId = setInterval(() => {
    timerState.remaining -= 1;
    updateTimerDisplay();
    scheduleDraftSave();

    if (timerState.remaining <= 0) {
      finishRest();
    }
  }, 1000);
  scheduleDraftSave();
}

function togglePauseTimer() {
  if (timerState.remaining <= 0) {
    startRestTimer(getDefaultRestSeconds());
    return;
  }

  if (timerState.running) {
    clearTimerInterval();
    timerState.running = false;
    setTimerMessage("已暂停");
    scheduleDraftSave();
    return;
  }

  timerState.running = true;
  setTimerMessage("休息中");
  timerState.intervalId = setInterval(() => {
    timerState.remaining -= 1;
    updateTimerDisplay();
    scheduleDraftSave();

    if (timerState.remaining <= 0) {
      finishRest();
    }
  }, 1000);
  scheduleDraftSave();
}

function adjustTimer(deltaSeconds) {
  timerState.remaining = Math.max(0, timerState.remaining + deltaSeconds);
  updateTimerDisplay();

  if (timerState.remaining === 0) {
    finishRest();
  }
  scheduleDraftSave();
}

function skipRest() {
  clearTimerInterval();
  timerState.running = false;
  timerState.remaining = 0;
  updateTimerDisplay();
  setTimerMessage("已跳过休息");
  scheduleDraftSave();
}

function finishRest() {
  clearTimerInterval();
  timerState.running = false;
  timerState.remaining = 0;
  updateTimerDisplay();
  setTimerMessage("休息结束，可以开始下一组", true);

  if ("vibrate" in navigator) {
    navigator.vibrate(250);
  }
  scheduleDraftSave();
}

function clearTimerInterval() {
  if (timerState.intervalId) {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
  }
}

function updateTimerDisplay() {
  dom.timerDisplay.textContent = formatTime(timerState.remaining);
}

function setTimerMessage(message, isFinished = false) {
  dom.timerMessage.textContent = message;
  dom.timerMessage.classList.toggle("timer-finished", isFinished);
}

function updateSetPainWarning() {
  const pain = getCurrentSetPain();
  dom.setPainWarning.classList.toggle("hidden", !isPainRisk(pain));
}

// =========================
// 渲染
// =========================

function renderWorkoutUi(options = {}) {
  const { includeHistory = false, refreshAi = true } = options;
  renderRecords();
  updateSummary();
  updateCurrentSetLabel();
  updateRestContext();
  updateLastPerformanceHint();
  if (includeHistory) renderHistory();
  if (refreshAi) refreshGeneratedAiText();
}

function renderRecords() {
  if (todayRecords.length === 0) {
    dom.recordsList.className = "records-list empty";
    dom.recordsList.textContent = "还没有完成的组";
    return;
  }

  dom.recordsList.className = "records-list";
  dom.recordsList.innerHTML = groupRecordsByExercise(todayRecords).map((exercise) => {
    const stats = calculateExerciseStats(exercise.records);
    const plannedSets = getExercisePlannedSets(exercise.records);
    const completedSets = exercise.records.length;
    const isCurrent = exercise.name === getCurrentExerciseName();
    const isCompleted = completedSets >= plannedSets;
    const statusText = isCompleted ? "已完成" : isCurrent ? "进行中" : "未完成";
    const statusClass = isCompleted ? "done" : isCurrent ? "active" : "idle";
    const detailsOpen = shouldOpenExerciseDetails(exercise.name, isCurrent, isCompleted) ? "open" : "";

    return `
      <article class="exercise-record-card ${isCurrent ? "is-current" : ""}">
        <div class="exercise-record-head">
          <div>
            <p class="exercise-record-title">🏋️ ${escapeHtml(exercise.name)}</p>
            <div class="exercise-record-meta">
              ${escapeHtml(formatList(exercise.targetMuscles))}｜${escapeHtml(exercise.exerciseType)}｜已完成 <strong>${completedSets}</strong> / ${plannedSets} 组
            </div>
          </div>
          <span class="record-status ${statusClass}">${statusText}</span>
        </div>

        <div class="exercise-summary-title">动作摘要</div>
        <dl class="exercise-summary-grid">
          <div>
            <dt>总次数</dt>
            <dd>${stats.totalReps} 次</dd>
          </div>
          <div>
            <dt>Volume：训练量</dt>
            <dd>${formatNumber(stats.totalVolume)} kg</dd>
          </div>
          <div>
            <dt>最佳组</dt>
            <dd>${stats.bestSet ? `${formatNumber(stats.bestSet.weight)}kg × ${stats.bestSet.reps}次` : "暂无"}</dd>
          </div>
          <div>
            <dt>e1RM：估算 1RM</dt>
            <dd>${stats.highestE1rmSet ? `约 ${formatNumber(getE1rm(stats.highestE1rmSet))} kg` : "暂无"}</dd>
          </div>
        </dl>

        <details class="set-details" data-exercise-details="${escapeHtml(exercise.name)}" ${detailsOpen}>
          <summary>组记录（${completedSets} 组）</summary>
          <div class="set-list" aria-label="${escapeHtml(exercise.name)}的组记录">
            ${exercise.records.map((record) => renderSetRow(record)).join("")}
          </div>
        </details>

        <button class="delete-exercise-btn small-danger" type="button" data-delete-exercise="${encodeURIComponent(exercise.name)}">删除整个动作</button>
      </article>
    `;
  }).join("");
}

function shouldOpenExerciseDetails(exerciseName, isCurrent, isCompleted) {
  if (exerciseDetailsOpenOverrides.has(exerciseName)) {
    return exerciseDetailsOpenOverrides.get(exerciseName);
  }

  return Boolean(isCurrent && !isCompleted);
}

function shouldAutoOpenExercise(exerciseName) {
  if (!exerciseName) return false;
  const records = todayRecords.filter((record) => record.exerciseName === exerciseName);
  if (records.length === 0) return true;
  return records.length < getExercisePlannedSets(records);
}

function setExerciseDetailsOpen(exerciseName, isOpen) {
  if (!exerciseName) return;
  exerciseDetailsOpenOverrides.set(exerciseName, Boolean(isOpen));
}

function renderSetRow(record) {
  const painSummary = getPainSummary(record.pain);

  return `
    <div class="set-row">
      <div class="set-info">
        <strong>第 ${record.setNumber} 组：</strong>
        ${escapeHtml(record.setType || "正式组")}｜${formatNumber(record.weight)}kg × ${record.reps}次｜${escapeHtml(record.stability)}｜RIR ${escapeHtml(record.rir)}｜RPE ${escapeHtml(record.rpe)}｜${escapeHtml(record.feeling)}｜${escapeHtml(formatList(getNormalizedTagArray("force", record.force)))}
        <div class="set-tech">技术：${escapeHtml(formatList(getNormalizedTagArray("technique", record.technique)))}</div>
        ${painSummary ? `<div class="set-pain">疼痛：${escapeHtml(painSummary)}</div>` : ""}
      </div>
      <button class="small-danger" type="button" data-delete-record="${record.id}">删除本组</button>
    </div>
  `;
}

function handleRecordDetailsToggle(event) {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement)) return;
  const exerciseName = details.dataset.exerciseDetails;
  if (!exerciseName) return;

  setExerciseDetailsOpen(exerciseName, details.open);
}

function handleRecordActions(event) {
  const deleteExerciseButton = event.target.closest("[data-delete-exercise]");
  if (deleteExerciseButton) {
    const exerciseName = decodeURIComponent(deleteExerciseButton.dataset.deleteExercise);
    const shouldDelete = confirm(`将删除该动作下的所有组记录：${exerciseName}\n\n已保存的历史记录不会被删除。\n确定继续吗？`);
    if (!shouldDelete) return;

    const removed = removeExerciseRecords(exerciseName);
    if (removed.length === 0) return;

    afterCurrentRecordsChanged();
    showUndoDelete(`已删除：${exerciseName}，共 ${removed.length} 组`, removed);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-record]");
  if (!deleteButton) return;

  const recordIndex = todayRecords.findIndex((record) => record.id === deleteButton.dataset.deleteRecord);
  if (recordIndex === -1) return;

  const [record] = todayRecords.splice(recordIndex, 1);
  afterCurrentRecordsChanged();
  showUndoDelete(`已删除：${record.exerciseName} 第 ${record.setNumber} 组`, [{ index: recordIndex, record }]);
}

function clearCurrentExerciseRecords() {
  const exerciseName = getCurrentExerciseName();
  if (!exerciseName) {
    showNotice("请先选择或输入当前动作");
    return;
  }

  const count = getCompletedSetCount(exerciseName);
  if (count === 0) {
    showNotice("当前动作还没有已完成组记录");
    return;
  }

  const shouldClear = confirm(`将清空当前动作记录：${exerciseName}\n\n将删除该动作下的所有组记录。已保存的历史记录不会被删除。\n确定继续吗？`);
  if (!shouldClear) return;

  const removed = removeExerciseRecords(exerciseName);
  if (removed.length === 0) return;

  afterCurrentRecordsChanged();
  showUndoDelete(`已删除：${exerciseName}，共 ${removed.length} 组`, removed);
}

function removeExerciseRecords(exerciseName) {
  const removed = [];

  for (let index = todayRecords.length - 1; index >= 0; index -= 1) {
    if (todayRecords[index].exerciseName === exerciseName) {
      removed.unshift({ index, record: todayRecords[index] });
      todayRecords.splice(index, 1);
    }
  }

  return removed;
}

function afterCurrentRecordsChanged() {
  renumberSets();
  markWorkoutDirty();
  renderWorkoutUi();
}

function showUndoDelete(message, removedItems, restoreAction) {
  clearPendingDelete();
  clearTimeout(draftSaveTimer);
  pendingDelete = {
    removedItems,
    restoreAction,
    timeoutId: setTimeout(() => {
      pendingDelete = null;
      hideUndoToast();
      scheduleDraftSave();
    }, TIMER_CONFIG.deleteUndoMs)
  };
  dom.undoMessage.textContent = message;
  dom.undoDeleteBtn.classList.remove("hidden");
  dom.undoToast.classList.remove("hidden");
}

function undoLastDelete() {
  if (!pendingDelete) return;

  clearTimeout(pendingDelete.timeoutId);
  if (typeof pendingDelete.restoreAction === "function") {
    pendingDelete.restoreAction();
  } else {
    pendingDelete.removedItems
      .slice()
      .sort((a, b) => a.index - b.index)
      .forEach((item) => {
        todayRecords.splice(Math.min(item.index, todayRecords.length), 0, item.record);
      });
  }

  pendingDelete = null;
  hideUndoToast();
  afterCurrentRecordsChanged();
  scheduleDraftSave();
}

function clearPendingDelete() {
  if (!pendingDelete) return;
  clearTimeout(pendingDelete.timeoutId);
  pendingDelete = null;
}

function hideUndoToast() {
  dom.undoToast.classList.add("hidden");
}

function showNotice(message) {
  if (pendingDelete) return;
  dom.undoMessage.textContent = message;
  dom.undoDeleteBtn.classList.add("hidden");
  dom.undoToast.classList.remove("hidden");
  setTimeout(() => {
    if (!pendingDelete) hideUndoToast();
  }, 2400);
}

function renumberSets() {
  const counts = {};
  todayRecords.forEach((record) => {
    counts[record.exerciseName] = (counts[record.exerciseName] || 0) + 1;
    record.setNumber = counts[record.exerciseName];
  });
}

// =========================
// 数据快照与统计
// =========================

function getTodayInfo() {
  return {
    date: dom.workoutDate.value,
    bodyParts: getMultiValueWithOther("bodyParts"),
    mainGoal: getSingleValue("mainGoal"),
    secondaryGoals: getMultiValueWithOther("secondaryGoals"),
    dailyStatus: getMultiValueWithOther("dailyStatus"),
    sleepQuality: getSingleValue("sleepQuality"),
    sleepEvents: getMultiValueWithOther("sleepEvents"),
    nutritionStatus: getMultiValueWithOther("nutritionStatus"),
    hydrationStatus: getMultiValueWithOther("hydrationStatus"),
    supplements: getMultiValueWithOther("supplements"),
    trainingEnvironment: getMultiValueWithOther("trainingEnvironment"),
    dailyNote: dom.dailyNote.value.trim()
  };
}

function getPreWorkoutInfo() {
  return {
    recoveryStatus: getSingleValue("recoveryStatus"),
    sorenessParts: getMultiValueWithOther("sorenessParts"),
    painParts: getMultiValueWithOther("prePainParts"),
    painLevel: Number(getSingleValue("prePainLevel", "0")) || 0,
    painNote: dom.prePainNote.value.trim()
  };
}

function getPostWorkoutFeedback() {
  return {
    feeling: getMultiValueWithOther("postFeeling"),
    painParts: getMultiValueWithOther("postPainParts"),
    painLevel: Number(getSingleValue("postPainLevel", "0")) || 0,
    nextTrainingNote: dom.nextTrainingNote.value.trim()
  };
}

function buildWorkoutSnapshot(durationSeconds = getTrainingDurationSeconds()) {
  return {
    id: currentWorkoutId,
    workoutId: currentWorkoutId,
    savedAt: new Date().toISOString(),
    workoutStartedAt,
    info: getTodayInfo(),
    preWorkout: getPreWorkoutInfo(),
    records: todayRecords.map((record) => ({ ...record, pain: { ...(record.pain || {}) } })),
    postWorkout: getPostWorkoutFeedback(),
    stats: calculateStats(todayRecords, durationSeconds)
  };
}

function calculateExerciseStats(records) {
  const totalReps = records.reduce((sum, record) => sum + Number(record.reps || 0), 0);
  const totalVolume = records.reduce((sum, record) => sum + getSetVolume(record), 0);
  const bestSet = records.reduce((best, record) => {
    return !best || getSetVolume(record) > getSetVolume(best) ? record : best;
  }, null);
  const highestE1rmSet = records.reduce((best, record) => {
    return !best || getE1rm(record) > getE1rm(best) ? record : best;
  }, null);

  return {
    totalReps,
    totalVolume,
    bestSet,
    highestE1rmSet
  };
}

function getExercisePlannedSets(records) {
  return records.reduce((maxSets, record) => {
    return Math.max(maxSets, Number(record.plannedSets) || 1);
  }, 1);
}

function calculateStats(records = todayRecords, durationSeconds = getTrainingDurationSeconds()) {
  const totalSets = records.length;
  const totalReps = records.reduce((sum, record) => sum + Number(record.reps || 0), 0);
  const totalVolume = records.reduce((sum, record) => sum + getSetVolume(record), 0);
  const bestSet = records.reduce((best, record) => {
    return !best || getSetVolume(record) > getSetVolume(best) ? record : best;
  }, null);
  const highestE1rmSet = records.reduce((best, record) => {
    return !best || getE1rm(record) > getE1rm(best) ? record : best;
  }, null);

  return {
    durationSeconds,
    totalSets,
    totalReps,
    totalVolume,
    bestSet,
    highestE1rmSet,
    possiblePr: getPossiblePrText(records)
  };
}

function updateSummary() {
  const snapshot = buildWorkoutSnapshot();
  const stats = snapshot.stats;
  const painRisk = getWorkoutPainRisk(snapshot);

  dom.summaryDuration.textContent = formatDuration(stats.durationSeconds);
  dom.summarySets.textContent = stats.totalSets;
  dom.summaryReps.textContent = stats.totalReps;
  dom.summaryVolume.textContent = `${formatNumber(stats.totalVolume)} kg`;
  dom.summaryBestSet.textContent = stats.bestSet
    ? `${stats.bestSet.exerciseName} 第${stats.bestSet.setNumber}组 ${formatNumber(stats.bestSet.weight)}kg × ${stats.bestSet.reps}次`
    : "暂无";
  dom.summaryE1rm.textContent = stats.highestE1rmSet
    ? `${stats.highestE1rmSet.exerciseName} ${formatNumber(getE1rm(stats.highestE1rmSet))}kg`
    : "暂无";
  dom.summaryPr.textContent = stats.possiblePr;
  dom.summaryStatusTags.textContent = getStatusSummary(snapshot);
  dom.summaryPainRisk.textContent = painRisk.hasRisk ? "⚠️ 今日存在需要注意的不适信号" : "暂无明显不适信号";
  dom.summaryPainRisk.classList.toggle("risk-text", painRisk.hasRisk);
}

function getPossiblePrText(records) {
  if (records.length === 0) return "暂无";

  const historyBest = buildHistoryBestMap();
  if (Object.keys(historyBest).length === 0) return "暂无历史对比";

  const messages = [];
  const seen = new Set();

  records.forEach((record) => {
    const best = historyBest[record.exerciseName];
    const e1rm = getE1rm(record);
    const marks = [];

    if (!best) {
      marks.push("首次记录");
    } else {
      if (record.weight > best.maxWeight) marks.push(`重量 ${formatNumber(record.weight)}kg`);
      if (e1rm > best.maxE1rm) marks.push(`e1RM ${formatNumber(e1rm)}kg`);
    }

    if (marks.length > 0) {
      const text = `${record.exerciseName} ${marks.join("、")}`;
      if (!seen.has(text)) {
        seen.add(text);
        messages.push(text);
      }
    }
  });

  return messages.length > 0 ? `可能 PR：${messages.join("；")}` : "暂无可能 PR";
}

function buildHistoryBestMap() {
  const bestMap = {};

  historyRecords.forEach((workout) => {
    (workout.records || []).forEach((record) => {
      const currentBest = bestMap[record.exerciseName] || { maxWeight: 0, maxE1rm: 0 };
      currentBest.maxWeight = Math.max(currentBest.maxWeight, Number(record.weight) || 0);
      currentBest.maxE1rm = Math.max(currentBest.maxE1rm, getE1rm(record));
      bestMap[record.exerciseName] = currentBest;
    });
  });

  return bestMap;
}

function markWorkoutDirty() {
  if (isApplyingDraft) return;
  if (!workoutSaved) return;

  workoutSaved = false;
  updateSaveButtonState();
}

function updateSaveButtonState() {
  dom.saveTodayBtn.disabled = workoutSaved;
  dom.saveTodayBtn.textContent = workoutSaved ? "已保存今日训练" : "💾 保存今日训练";
}

function saveTodayWorkout() {
  if (workoutSaved) return;

  if (todayRecords.length === 0) {
    alert("请至少完成一组后再保存");
    return;
  }

  const workout = buildWorkoutSnapshot(getTrainingDurationSeconds());
  const existingIndex = historyRecords.findIndex((item) => (item.workoutId || item.id) === workout.workoutId);
  if (existingIndex >= 0) {
    historyRecords[existingIndex] = workout;
  } else {
    historyRecords.unshift(workout);
  }

  workoutSaved = true;
  saveHistory();
  clearTimeout(draftSaveTimer);
  removeDraft();
  updateSaveButtonState();
  renderWorkoutUi({ includeHistory: true, refreshAi: false });
  alert("今日训练已保存");
}

// =========================
// 历史、模板与备份
// =========================

function toggleHistory() {
  dom.historyList.classList.toggle("hidden");
  renderHistory();
}

function clearTodayWorkout() {
  const hasCurrentData = hasCurrentWorkoutData();
  if (!hasCurrentData) {
    showNotice("当前没有需要清空的训练记录");
    return;
  }

  const shouldClear = confirm("将清空当前训练草稿和当前记录。\n已保存的历史记录不会被删除。\n\n确定清空今日训练吗？");
  if (!shouldClear) return;

  const snapshot = buildDraft();
  resetCurrentWorkoutState();
  removeDraft();
  showUndoDelete("已清空今日训练", [], () => {
    applyDraft(snapshot);
  });
}

function hasCurrentWorkoutData() {
  const draft = buildDraft();
  return hasDraftContent(draft);
}

function resetCurrentWorkoutState() {
  isApplyingDraft = true;
  clearTimerInterval();
  todayRecords.splice(0, todayRecords.length);
  workoutStartedAt = null;
  currentWorkoutId = createId();
  workoutSaved = false;
  targetMusclesManuallyEdited = false;
  exerciseDetailsOpenOverrides = new Map();

  Object.entries(tagConfigs).forEach(([field, config]) => {
    tagValues[field] = cloneDefaultValue(config);
    updateTagGroup(field);
  });

  dom.workoutDate.value = getTodayDateString();
  dom.dailyNote.value = "";
  dom.prePainNote.value = "";
  dom.exerciseSelect.value = "杠铃卧推";
  dom.exerciseManual.value = "";
  dom.plannedSets.value = "4";
  dom.defaultRest.value = restRecommendations["复合动作"];
  dom.weightInput.value = "";
  dom.repsInput.value = "";
  dom.setNote.value = "";
  dom.setPainNote.value = "";
  dom.nextTrainingNote.value = "";
  document.querySelectorAll("[data-other-for]").forEach((input) => {
    input.value = "";
  });

  activeExerciseName = getCurrentExerciseName();
  timerState.remaining = getDefaultRestSeconds();
  timerState.running = false;
  updateOtherInputs();
  syncExerciseSourceState();
  collapseSetPanels();
  updateSetPainWarning();
  updateTimerDisplay();
  setTimerMessage("完成一组后会自动开始休息");
  updateSaveButtonState();
  renderWorkoutUi();
  isApplyingDraft = false;
}

function renderHistory() {
  if (dom.historyList.classList.contains("hidden")) return;

  const recordsToRender = getFilteredHistoryRecords();

  if (recordsToRender.length === 0) {
    dom.historyList.innerHTML = '<p class="empty">暂无历史记录</p>';
    return;
  }

  dom.historyList.innerHTML = recordsToRender.map((workout) => {
    const historyId = workout.workoutId || workout.id;
    const isExpanded = expandedHistoryId === historyId;
    const stats = workout.stats || calculateStats(workout.records || [], 0);
    const info = normalizeInfo(workout.info || {});
    const painRisk = getWorkoutPainRisk(workout);
    const detail = isExpanded ? renderHistoryDetail(workout) : "";

    return `
      <article class="history-item ${painRisk.hasRisk ? "has-risk" : ""}">
        <div class="history-main" data-toggle-history="${historyId}">
          <div>
            <p class="history-title">${escapeHtml(info.date || "未记录日期")} · ${escapeHtml(formatList(info.bodyParts, "未记录部位"))}</p>
            <div class="history-meta">
              主目标：${escapeHtml(info.mainGoal || "未记录")} · ${formatDuration(stats.durationSeconds || 0)} · ${stats.totalSets || 0}组 · Volume（训练量）：${formatNumber(stats.totalVolume || 0)}kg
              ${painRisk.hasRisk ? "<br>⚠️ 有不适风险提示" : ""}
            </div>
          </div>
        </div>
        <div class="history-actions">
          <button type="button" data-toggle-history="${historyId}">${isExpanded ? "收起详情" : "查看详情"}</button>
          <button class="small-danger" type="button" data-delete-history="${historyId}">删除</button>
        </div>
        ${detail}
      </article>
    `;
  }).join("");
}

function getFilteredHistoryRecords() {
  const keyword = dom.historySearch.value.trim().toLowerCase();
  if (!keyword) return historyRecords;

  return historyRecords.filter((workout) => {
    const info = normalizeInfo(workout.info || {});
    const exerciseNames = (workout.records || []).map((record) => record.exerciseName).join(" ");
    const haystack = [
      info.date,
      formatList(info.bodyParts),
      exerciseNames
    ].join(" ").toLowerCase();
    return haystack.includes(keyword);
  });
}

function renderHistoryDetail(workout) {
  return `<div class="history-detail">${escapeHtml(buildAiText(workout, false))}</div>`;
}

function handleHistoryClick(event) {
  const toggleButton = event.target.closest("[data-toggle-history]");
  const deleteButton = event.target.closest("[data-delete-history]");

  if (toggleButton) {
    expandedHistoryId = expandedHistoryId === toggleButton.dataset.toggleHistory
      ? null
      : toggleButton.dataset.toggleHistory;
    renderHistory();
    return;
  }

  if (deleteButton) {
    const shouldDelete = confirm("确定删除这条历史记录吗？");
    if (!shouldDelete) return;

    const deleteId = deleteButton.dataset.deleteHistory;
    const deletingCurrentWorkout = deleteId === currentWorkoutId;
    historyRecords = historyRecords.filter((workout) => (workout.workoutId || workout.id) !== deleteId);
    if (deletingCurrentWorkout) {
      workoutSaved = false;
      updateSaveButtonState();
    }
    saveHistory();
    renderWorkoutUi({ includeHistory: true, refreshAi: false });
  }
}

function clearHistory() {
  const shouldClear = confirm("此操作会删除所有历史记录，无法撤回。\n当前训练草稿不会被删除。\n\n确定继续吗？");
  if (!shouldClear) return;
  const shouldConfirmAgain = confirm("请再次确认：清空全部历史记录后无法恢复。");
  if (!shouldConfirmAgain) return;

  historyRecords = [];
  expandedHistoryId = null;
  workoutSaved = false;
  updateSaveButtonState();
  saveHistory();
  renderWorkoutUi({ includeHistory: true, refreshAi: false });
}

function renderTemplateOptions() {
  if (trainingTemplates.length === 0) {
    dom.templateSelect.innerHTML = '<option value="">暂无模板</option>';
    return;
  }

  dom.templateSelect.innerHTML = trainingTemplates.map((template) => (
    `<option value="${template.id}">${escapeHtml(template.name)}（${template.exercises.length} 个动作）</option>`
  )).join("");
}

function saveCurrentTemplate() {
  const exercises = collectCurrentTemplateExercises();
  if (exercises.length === 0) {
    showNotice("请先选择或输入至少一个动作");
    return;
  }

  const name = dom.templateName.value.trim() || `${formatList(getMultiValueWithOther("bodyParts"))}模板`;
  const template = {
    id: createId(),
    name,
    createdAt: new Date().toISOString(),
    bodyParts: getMultiValueWithOther("bodyParts"),
    exercises
  };

  trainingTemplates = trainingTemplates.filter((item) => item.name !== name);
  trainingTemplates.unshift(template);
  saveTemplates();
  renderTemplateOptions();
  dom.templateSelect.value = template.id;
  showNotice(`已保存模板：${name}`);
}

function collectCurrentTemplateExercises() {
  const map = new Map();

  todayRecords.forEach((record) => {
    if (!map.has(record.exerciseName)) {
      map.set(record.exerciseName, {
        exerciseName: record.exerciseName,
        targetMuscles: getRecordTargetMuscles(record),
        exerciseType: record.exerciseType || "复合动作",
        plannedSets: Number(record.plannedSets) || 4,
        defaultRestSeconds: Number(record.defaultRestSeconds) || restRecommendations["复合动作"]
      });
    }
  });

  const current = getCurrentExerciseSettings();
  if (current.exerciseName && !map.has(current.exerciseName)) {
    map.set(current.exerciseName, {
      exerciseName: current.exerciseName,
      targetMuscles: current.targetMuscles,
      exerciseType: current.exerciseType,
      plannedSets: current.plannedSets,
      defaultRestSeconds: current.defaultRestSeconds
    });
  }

  return Array.from(map.values());
}

function useSelectedTemplate() {
  const template = getSelectedTemplate();
  if (!template) {
    showNotice("请选择模板");
    return;
  }

  if (todayRecords.length > 0) {
    const shouldUse = confirm("使用模板会清空当前已完成组记录，但不会覆盖今日状态。\n确定继续吗？");
    if (!shouldUse) return;
  }

  todayRecords.splice(0, todayRecords.length);
  workoutStartedAt = null;
  exerciseDetailsOpenOverrides = new Map();
  applyTemplateExercise(template.exercises[0]);
  resetCurrentSetForm();
  afterCurrentRecordsChanged();
  showNotice(`已加载模板：${template.name}`);
}

function applyTemplateExercise(exercise) {
  if (!exercise) return;

  if (commonExerciseDefaults[exercise.exerciseName]) {
    dom.exerciseSelect.value = exercise.exerciseName;
    dom.exerciseManual.value = "";
  } else {
    dom.exerciseSelect.value = "";
    dom.exerciseManual.value = exercise.exerciseName;
  }

  activeExerciseName = getCurrentExerciseName();
  syncExerciseSourceState();
  setTagValue("targetMuscles", exercise.targetMuscles || []);
  setTagValue("exerciseType", exercise.exerciseType || "复合动作");
  dom.plannedSets.value = String(exercise.plannedSets || 4);
  dom.defaultRest.value = String(exercise.defaultRestSeconds || restRecommendations[exercise.exerciseType] || 60);
  updateLastPerformanceHint();
}

function deleteSelectedTemplate() {
  const template = getSelectedTemplate();
  if (!template) {
    showNotice("请选择模板");
    return;
  }

  const shouldDelete = confirm(`确定删除模板「${template.name}」吗？`);
  if (!shouldDelete) return;

  trainingTemplates = trainingTemplates.filter((item) => item.id !== template.id);
  saveTemplates();
  renderTemplateOptions();
  showNotice(`已删除模板：${template.name}`);
}

function getSelectedTemplate() {
  return trainingTemplates.find((template) => template.id === dom.templateSelect.value) || null;
}

function exportBackup() {
  saveDraftImmediately();
  const backup = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    historyRecords,
    draft: loadDraft(),
    trainingTemplates
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fitness-backup.json";
  link.click();
  URL.revokeObjectURL(url);
  showNotice("备份已导出");
}

function importBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const shouldImport = confirm("导入备份可能会覆盖当前本地数据，是否继续？");
  if (!shouldImport) {
    dom.backupImportInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const backup = JSON.parse(String(reader.result || "{}"));
      const importedHistory = normalizeImportedHistory(backup.historyRecords || backup.history || []);
      const importedTemplates = normalizeImportedTemplates(backup.trainingTemplates || backup.templates || []);

      historyRecords = importedHistory;
      trainingTemplates = importedTemplates;
      saveHistory();
      saveTemplates();

      if (backup.draft && hasDraftContent(backup.draft)) {
        writeJsonStorage(STORAGE_KEYS.draft, backup.draft);
      } else {
        removeDraft();
      }

      showNotice("备份导入成功，正在刷新");
      setTimeout(() => window.location.reload(), 600);
    } catch (error) {
      showNotice("导入失败，请确认 JSON 备份文件有效");
    } finally {
      dom.backupImportInput.value = "";
    }
  };
  reader.readAsText(file);
}

function normalizeImportedHistory(value) {
  return Array.isArray(value)
    ? value.filter((workout) => workout && typeof workout === "object").map((workout) => {
      const id = workout.id || workout.workoutId || createId();
      return {
        ...workout,
        id,
        workoutId: workout.workoutId || id,
        records: Array.isArray(workout.records) ? workout.records : []
      };
    })
    : [];
}

function normalizeImportedTemplates(value) {
  return Array.isArray(value) ? value.map(normalizeTemplate).filter(Boolean) : [];
}

// =========================
// 草稿保存与恢复
// =========================

function handleDraftInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.closest("#draftRestore") || target.closest("#undoToast")) return;
  if (!target.matches("input, textarea, select")) return;

  updateSummary();
  markWorkoutDirty();
  refreshGeneratedAiText();
  scheduleDraftSave();
}

function checkForDraft() {
  const draft = loadDraft();
  if (!draft || !hasDraftContent(draft)) return;

  draftRestorePending = true;
  const records = draft.records || [];
  const exerciseCount = groupRecordsByExercise(records).length;
  const date = draft.form?.workoutDate || draft.info?.date || "未记录日期";
  dom.draftSummary.textContent = `${date} · 已完成动作 ${exerciseCount} 个 · 已完成组数 ${records.length} 组`;
  dom.draftRestore.classList.remove("hidden");
}

function continueDraft() {
  const draft = loadDraft();
  if (!draft) return;

  draftRestorePending = false;
  dom.draftRestore.classList.add("hidden");
  applyDraft(draft);
  scheduleDraftSave();
}

function discardDraft() {
  const shouldDiscard = confirm("将清空当前未保存训练草稿。\n已保存的历史记录不会被删除。\n\n确认放弃吗？");
  if (!shouldDiscard) return;

  draftRestorePending = false;
  removeDraft();
  dom.draftRestore.classList.add("hidden");
}

function applyDraft(draft) {
  isApplyingDraft = true;
  clearTimerInterval();

  todayRecords.splice(0, todayRecords.length, ...(draft.records || []));
  workoutStartedAt = draft.workoutStartedAt || null;
  currentWorkoutId = draft.workoutId || draft.id || currentWorkoutId || createId();
  workoutSaved = Boolean(draft.workoutSaved && historyRecords.some((workout) => (workout.workoutId || workout.id) === currentWorkoutId));
  targetMusclesManuallyEdited = Boolean(draft.targetMusclesManuallyEdited);
  exerciseDetailsOpenOverrides = new Map();

  const migratedTagValues = migrateDraftTagValues(draft.tagValues || {});
  Object.entries(tagConfigs).forEach(([field, config]) => {
    const value = migratedTagValues && Object.prototype.hasOwnProperty.call(migratedTagValues, field)
      ? migratedTagValues[field]
      : cloneDefaultValue(config);
    tagValues[field] = isMultiTagMode(config) ? sanitizeTagValues(config, normalizeArray(value)) : Array.isArray(value) ? value[0] || "" : value;
    updateTagGroup(field);
  });

  const form = draft.form || {};
  dom.workoutDate.value = form.workoutDate || getTodayDateString();
  dom.dailyNote.value = form.dailyNote || "";
  dom.prePainNote.value = form.prePainNote || "";
  if (Object.prototype.hasOwnProperty.call(form, "exerciseSelect")) {
    dom.exerciseSelect.value = form.exerciseSelect || "";
  }
  dom.exerciseManual.value = form.exerciseManual || "";
  dom.plannedSets.value = form.plannedSets || "4";
  dom.defaultRest.value = form.defaultRest || getDefaultRestSeconds();
  dom.weightInput.value = form.weightInput || "";
  dom.repsInput.value = form.repsInput || "";
  dom.setNote.value = form.setNote || "";
  dom.setPainNote.value = form.setPainNote || "";
  dom.nextTrainingNote.value = form.nextTrainingNote || "";
  syncExerciseSourceState();

  Object.entries(form.otherInputs || {}).forEach(([field, value]) => {
    const input = document.querySelector(`[data-other-for="${field}"]`);
    if (input) input.value = value || "";
  });
  updateOtherInputs();

  const restoredTimer = getRestoredTimerState(draft.timer);
  timerState.remaining = restoredTimer.remaining;
  timerState.running = false;
  updateTimerDisplay();
  setTimerMessage(restoredTimer.message || "草稿已恢复");

  activeExerciseName = getCurrentExerciseName();
  renumberSets();
  renderWorkoutUi({ refreshAi: false });
  updateSetPainWarning();
  updateSaveButtonState();

  isApplyingDraft = false;

  if (restoredTimer.shouldResume) {
    startRestTimer(restoredTimer.remaining);
  }
}

function getRestoredTimerState(timer) {
  if (!timer) {
    return {
      remaining: getDefaultRestSeconds(),
      message: "草稿已恢复",
      shouldResume: false
    };
  }

  let remaining = Number(timer.remaining) || 0;
  if (timer.running && timer.savedAt) {
    const elapsed = Math.max(0, Math.floor((Date.now() - new Date(timer.savedAt).getTime()) / 1000));
    remaining = Math.max(0, remaining - elapsed);
  }

  return {
    remaining,
    message: remaining > 0 ? timer.message || "休息中" : "休息结束，可以开始下一组",
    shouldResume: Boolean(timer.running && remaining > 0)
  };
}

function migrateDraftTagValues(values) {
  const migrated = { ...(values || {}) };

  if (!migrated.sleepQuality && migrated.sleepStatus) {
    const sleep = splitLegacySleepStatus(migrated.sleepStatus);
    migrated.sleepQuality = sleep.quality;
    migrated.sleepEvents = sleep.events;
  }

  if (!migrated.sorenessParts && Array.isArray(migrated.recoveryStatus)) {
    const recovery = splitLegacyRecoveryStatus(migrated.recoveryStatus);
    migrated.recoveryStatus = recovery.status;
    migrated.sorenessParts = recovery.sorenessParts;
  }

  return migrated;
}

function scheduleDraftSave() {
  if (isApplyingDraft || draftRestorePending || pendingDelete) return;
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(saveDraft, TIMER_CONFIG.draftSaveDelayMs);
}

function saveDraftImmediately() {
  clearTimeout(draftSaveTimer);
  draftSaveTimer = null;
  saveDraft({ force: true });
}

function saveDraft(options = {}) {
  if (isApplyingDraft || draftRestorePending || pendingDelete) return;
  if (workoutSaved) {
    removeDraft();
    return;
  }

  const draft = buildDraft();
  if (!hasDraftContent(draft)) {
    removeDraft();
    return;
  }

  writeJsonStorage(STORAGE_KEYS.draft, draft);
}

function buildDraft() {
  const otherInputs = {};
  document.querySelectorAll("[data-other-for]").forEach((input) => {
    otherInputs[input.dataset.otherFor] = input.value.trim();
  });

  return {
    version: 1,
    workoutId: currentWorkoutId,
    workoutSaved,
    targetMusclesManuallyEdited,
    savedAt: new Date().toISOString(),
    workoutStartedAt,
    tagValues: structuredCloneSafe(tagValues),
    records: todayRecords.map((record) => ({ ...record, pain: { ...(record.pain || {}) } })),
    form: {
      workoutDate: dom.workoutDate.value,
      dailyNote: dom.dailyNote.value,
      prePainNote: dom.prePainNote.value,
      exerciseSelect: dom.exerciseSelect.value,
      exerciseManual: dom.exerciseManual.value,
      plannedSets: dom.plannedSets.value,
      defaultRest: dom.defaultRest.value,
      weightInput: dom.weightInput.value,
      repsInput: dom.repsInput.value,
      setNote: dom.setNote.value,
      setPainNote: dom.setPainNote.value,
      nextTrainingNote: dom.nextTrainingNote.value,
      otherInputs
    },
    timer: {
      remaining: timerState.remaining,
      running: timerState.running,
      message: dom.timerMessage.textContent,
      savedAt: new Date().toISOString()
    }
  };
}

function hasDraftContent(draft) {
  if (!draft) return false;
  const form = draft.form || {};
  return Boolean(
    draft.workoutStartedAt ||
    (draft.records && draft.records.length > 0) ||
    form.weightInput ||
    form.repsInput ||
    form.setNote ||
    form.setPainNote ||
    form.dailyNote ||
    form.prePainNote ||
    form.nextTrainingNote ||
    form.exerciseManual ||
    form.exerciseSelect !== "杠铃卧推" ||
    form.plannedSets !== "4" ||
    hasNonDefaultTagValues(draft.tagValues || {})
  );
}

function hasNonDefaultTagValues(values) {
  return Object.entries(tagConfigs).some(([field, config]) => {
    const current = values[field];
    const defaultValue = cloneDefaultValue(config);
    return JSON.stringify(current ?? defaultValue) !== JSON.stringify(defaultValue);
  });
}

function loadDraft() {
  return readJsonStorage(STORAGE_KEYS.draft, null);
}

function removeDraft() {
  removeStorageItem(STORAGE_KEYS.draft);
}

// =========================
// AI 导出
// =========================

function generateAiText(version = currentAiVersion) {
  currentAiVersion = version;
  const snapshot = buildWorkoutSnapshot();
  dom.aiOutput.value = buildAiText(snapshot, true, version);
  dom.aiModeLabel.textContent = `当前预览：${version === "brief" ? "简洁版" : "完整版"}`;
  dom.copyStatus.textContent = "AI 分析文本已生成";
}

function refreshGeneratedAiText() {
  if (!dom.aiOutput.value.trim()) return;

  const snapshot = buildWorkoutSnapshot();
  dom.aiOutput.value = buildAiText(snapshot, true, currentAiVersion);
  dom.copyStatus.textContent = "AI 分析文本已更新";
}

async function generateAndCopyAiText(version) {
  generateAiText(version);
  await copyAiText();
}

async function copyAiText() {
  if (!dom.aiOutput.value.trim()) {
    generateAiText(currentAiVersion);
  }

  try {
    await navigator.clipboard.writeText(dom.aiOutput.value);
    dom.copyStatus.textContent = "已复制到剪贴板";
  } catch (error) {
    dom.aiOutput.select();
    document.execCommand("copy");
    dom.copyStatus.textContent = "已尝试复制；如果失败，请手动长按选择复制";
  }
}

function buildAiText(workout, includeRequest, version = "full") {
  return version === "brief"
    ? buildAiBriefText(workout, includeRequest)
    : buildAiFullText(workout, includeRequest);
}

function buildAiRequestText(version, includeRequest) {
  if (!includeRequest) return "";

  const requests = AI_ANALYSIS_REQUESTS[version] || AI_ANALYSIS_REQUESTS.full;
  return `\n\n请帮我分析：\n${requests.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;
}

function buildAiFullText(workout, includeRequest) {
  const info = normalizeInfo(workout.info || {});
  const preWorkout = normalizePreWorkout(workout.preWorkout || {});
  const postWorkout = normalizePostWorkout(workout.postWorkout || {});
  const records = workout.records || [];
  const stats = workout.stats || calculateStats(records, 0);
  const exercises = groupRecordsByExercise(records);
  const signals = collectPainSignals(workout);

  const exerciseText = exercises.length > 0
    ? exercises.map((exercise, index) => buildExerciseAiText(exercise, index)).join("\n")
    : "暂无动作记录\n";

  const signalsText = signals.length > 0
    ? signals.map((signal) => `- ${signal}`).join("\n")
    : "暂无";
  const requestText = buildAiRequestText("full", includeRequest);

  return `日期：${info.date || "未记录"}
训练部位：${formatList(info.bodyParts)}
训练主目标：${info.mainGoal || "未记录"}
辅助目标：${formatList(info.secondaryGoals)}
今日综合状态：${formatList(info.dailyStatus)}
睡眠质量：${info.sleepQuality || "未记录"}
睡眠事件：${formatList(info.sleepEvents)}
饮食状态：${formatList(info.nutritionStatus)}
水分 / 出汗状态：${formatList(info.hydrationStatus)}
咖啡因 / 补剂记录：${formatList(info.supplements)}
训练环境：${formatList(info.trainingEnvironment)}
今日备注：${info.dailyNote || "无"}
总训练时长：${formatDuration(stats.durationSeconds || 0)}

练前状态：
恢复状态：${preWorkout.recoveryStatus || "未记录"}
酸痛部位：${formatList(preWorkout.sorenessParts)}
练前不适部位：${formatList(preWorkout.painParts)}
练前不适程度：${preWorkout.painLevel}/10
练前不适备注：${preWorkout.painNote || "无"}

动作记录：
${exerciseText}
今日统计：
总组数：${stats.totalSets || 0}
总次数：${stats.totalReps || 0}
总训练量 Volume（训练量）：${formatNumber(stats.totalVolume || 0)}kg
最佳组：${stats.bestSet ? `${stats.bestSet.exerciseName} 第${stats.bestSet.setNumber}组 ${formatNumber(stats.bestSet.weight)}kg × ${stats.bestSet.reps}次` : "暂无"}
最高 e1RM（估算 1RM）：${stats.highestE1rmSet ? `${stats.highestE1rmSet.exerciseName} ${formatNumber(getE1rm(stats.highestE1rmSet))}kg` : "暂无"}
可能 PR（个人纪录）：${stats.possiblePr || "暂无"}

训练后反馈：
训练后整体感觉：${formatList(postWorkout.feeling)}
训练后疼痛 / 不适部位：${formatList(postWorkout.painParts)}
训练后不适程度：${postWorkout.painLevel}/10
下次训练备注：${postWorkout.nextTrainingNote || "无"}

需要注意的疼痛 / 不适信号：
${signalsText}${requestText}`;
}

function buildAiBriefText(workout, includeRequest) {
  const info = normalizeInfo(workout.info || {});
  const preWorkout = normalizePreWorkout(workout.preWorkout || {});
  const records = workout.records || [];
  const stats = workout.stats || calculateStats(records, 0);
  const exercises = groupRecordsByExercise(records);
  const signals = collectPainSignals(workout);
  const exerciseText = exercises.length > 0
    ? exercises.map((exercise, index) => buildExerciseBriefAiText(exercise, index)).join("\n")
    : "暂无动作记录\n";
  const signalsText = signals.length > 0
    ? signals.map((signal) => `- ${signal}`).join("\n")
    : "暂无";
  const requestText = buildAiRequestText("brief", includeRequest);

  return `【AI 简洁版训练记录】
日期：${info.date || "未记录"}
训练部位：${formatList(info.bodyParts)}
主目标：${info.mainGoal || "未记录"}
今日综合状态：${formatList(info.dailyStatus)}
睡眠：${info.sleepQuality || "未记录"}${info.sleepEvents.length ? `，${formatList(info.sleepEvents)}` : ""}
饮食：${formatList(info.nutritionStatus)}
恢复：${preWorkout.recoveryStatus || "未记录"}，酸痛：${formatList(preWorkout.sorenessParts)}

动作记录：
${exerciseText}
今日统计：
总组数：${stats.totalSets || 0}
总次数：${stats.totalReps || 0}
总训练量：${formatNumber(stats.totalVolume || 0)}kg
最佳组：${stats.bestSet ? `${stats.bestSet.exerciseName} 第${stats.bestSet.setNumber}组 ${formatNumber(stats.bestSet.weight)}kg × ${stats.bestSet.reps}次` : "暂无"}
最高 e1RM：${stats.highestE1rmSet ? `${stats.highestE1rmSet.exerciseName} ${formatNumber(getE1rm(stats.highestE1rmSet))}kg` : "暂无"}

明显疼痛 / 不适信号：
${signalsText}${requestText}`;
}

function buildExerciseBriefAiText(exercise, index) {
  const lines = [`动作${index + 1}：${exercise.name}`];
  exercise.records.forEach((record) => {
    lines.push(`组${record.setNumber}：${formatNumber(record.weight)}kg × ${record.reps}次，RIR ${record.rir || "未记录"}，感受：${record.feeling || "未记录"}，发力感：${formatList(getNormalizedTagArray("force", record.force))}`);
  });
  return `${lines.join("\n")}\n`;
}

function buildExerciseAiText(exercise, index) {
  const first = exercise.records[0] || {};
  const lines = [
    `动作${index + 1}：${exercise.name}`,
    `目标肌群：${formatList(exercise.targetMuscles)}`,
    `动作类型：${exercise.exerciseType || "未记录"}`,
    `计划组数：${getExercisePlannedSets(exercise.records)}`,
    `默认休息时间：${first.defaultRestSeconds || 0}秒`
  ];

  exercise.records.forEach((record) => {
    lines.push(`组${record.setNumber}（${record.setType || "正式组"}）：重量 ${formatNumber(record.weight)}kg，次数 ${record.reps}次，稳定性：${record.stability || "未记录"}，感受：${record.feeling || "未记录"}，RIR（还能做几次）：${record.rir || "未记录"}，RPE（主观用力程度）：${record.rpe || "未填"}，发力感：${formatList(getNormalizedTagArray("force", record.force))}，技术表现：${formatList(getNormalizedTagArray("technique", record.technique))}，疼痛 / 不适反馈：${getPainSummary(record.pain) || "无"}，备注：${record.note || "无"}`);
  });

  return `${lines.join("\n")}\n`;
}

function groupRecordsByExercise(records) {
  const map = new Map();

  records.forEach((record) => {
    if (!map.has(record.exerciseName)) {
      map.set(record.exerciseName, {
        name: record.exerciseName,
        targetMuscles: getRecordTargetMuscles(record),
        exerciseType: record.exerciseType || "未记录",
        records: []
      });
    }

    map.get(record.exerciseName).records.push(record);
  });

  return Array.from(map.values());
}

// =========================
// 工具函数与持久化
// =========================

function getTrainingDurationSeconds() {
  if (!workoutStartedAt) return 0;
  return Math.max(0, Math.floor((Date.now() - workoutStartedAt) / 1000));
}

function registerExerciseDefaults(names, targetMuscles, exerciseType, defaultRestSeconds) {
  names.forEach((name) => {
    commonExerciseDefaults[name] = {
      targetMuscles: [...targetMuscles],
      exerciseType,
      defaultRestSeconds
    };
  });
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSetVolume(record) {
  return (Number(record.weight) || 0) * (Number(record.reps) || 0);
}

function getE1rm(record) {
  const weight = Number(record.weight) || 0;
  const reps = Number(record.reps) || 0;
  return weight * (1 + reps / 30);
}

function isPainRisk(pain) {
  if (!pain) return false;
  const level = Number(pain.level || pain.painLevel || 0);
  const nature = getNormalizedTagArray("setPainNature", pain.nature);
  return level >= 4 || nature.some((item) => painRiskNatures.includes(item));
}

function getWorkoutPainRisk(workout) {
  const signals = collectPainSignals(workout);
  return {
    hasRisk: signals.length > 0,
    signals
  };
}

function collectPainSignals(workout) {
  const signals = [];
  const preWorkout = normalizePreWorkout(workout.preWorkout || {});
  const postWorkout = normalizePostWorkout(workout.postWorkout || {});

  if (Number(preWorkout.painLevel) >= 4) {
    signals.push(`练前：部位 ${formatList(preWorkout.painParts)}，程度 ${preWorkout.painLevel}/10，备注：${preWorkout.painNote || "无"}`);
  }

  (workout.records || []).forEach((record) => {
    if (!isPainRisk(record.pain)) return;
    const pain = record.pain || {};
    signals.push(`${record.exerciseName} 第${record.setNumber}组：部位 ${formatList(getNormalizedTagArray("setPainParts", pain.parts))}，性质 ${formatList(getNormalizedTagArray("setPainNature", pain.nature))}，程度 ${Number(pain.level || 0)}/10，时机 ${pain.timing || "未记录"}，应对方式 ${formatList(pain.actions)}`);
  });

  if (Number(postWorkout.painLevel) >= 4) {
    signals.push(`训练后：部位 ${formatList(postWorkout.painParts)}，程度 ${postWorkout.painLevel}/10，下次备注：${postWorkout.nextTrainingNote || "无"}`);
  }

  return signals;
}

function getPainSummary(pain) {
  if (!pain) return "";
  const level = Number(pain.level || 0);
  const partsValues = getNormalizedTagArray("setPainParts", pain.parts);
  const natureValues = getNormalizedTagArray("setPainNature", pain.nature);
  const hasPain = pain.timing !== "无" || level > 0 || hasMeaningfulValues(partsValues) || hasMeaningfulValues(natureValues);
  if (!hasPain) return "";

  const parts = formatList(partsValues, "未记录部位");
  const nature = formatList(natureValues, "未记录性质");
  const actions = formatList(pain.actions, "未记录应对");
  return `${parts} ${nature} ${level}/10，${pain.timing || "未记录时机"}，${actions}`;
}

function getStatusSummary(workout) {
  const info = normalizeInfo(workout.info || {});
  return [
    `综合：${formatList(info.dailyStatus)}`,
    `睡眠：${info.sleepQuality || "未记录"}${info.sleepEvents.length ? ` / ${formatList(info.sleepEvents)}` : ""}`,
    `饮食：${formatList(info.nutritionStatus)}`,
    `水分：${formatList(info.hydrationStatus)}`
  ].join("；");
}

function getRecordTargetMuscles(record) {
  if (Array.isArray(record.targetMuscles)) return record.targetMuscles;
  if (record.targetMuscle) return [record.targetMuscle];
  return [];
}

function normalizeInfo(info) {
  const legacySleep = splitLegacySleepStatus(info.sleepStatus);
  return {
    date: info.date || "",
    bodyParts: normalizeArray(info.bodyParts || info.bodyPart),
    mainGoal: info.mainGoal || info.trainingGoal || "",
    secondaryGoals: normalizeArray(info.secondaryGoals),
    dailyStatus: getNormalizedTagArray("dailyStatus", info.dailyStatus || info.dailyCondition),
    sleepQuality: info.sleepQuality || legacySleep.quality,
    sleepEvents: normalizeArray(info.sleepEvents || legacySleep.events),
    nutritionStatus: getNormalizedTagArray("nutritionStatus", info.nutritionStatus),
    hydrationStatus: getNormalizedTagArray("hydrationStatus", info.hydrationStatus),
    supplements: getNormalizedTagArray("supplements", info.supplements),
    trainingEnvironment: getNormalizedTagArray("trainingEnvironment", info.trainingEnvironment),
    dailyNote: info.dailyNote || ""
  };
}

function normalizePreWorkout(preWorkout) {
  const legacyRecovery = splitLegacyRecoveryStatus(preWorkout.recoveryStatus);
  return {
    recoveryStatus: preWorkout.recoveryStatus && !Array.isArray(preWorkout.recoveryStatus)
      ? preWorkout.recoveryStatus
      : legacyRecovery.status,
    sorenessParts: getNormalizedTagArray("sorenessParts", preWorkout.sorenessParts || legacyRecovery.sorenessParts),
    painParts: getNormalizedTagArray("prePainParts", preWorkout.painParts),
    painLevel: Number(preWorkout.painLevel || 0),
    painNote: preWorkout.painNote || ""
  };
}

function normalizePostWorkout(postWorkout) {
  return {
    feeling: getNormalizedTagArray("postFeeling", postWorkout.feeling),
    painParts: getNormalizedTagArray("postPainParts", postWorkout.painParts),
    painLevel: Number(postWorkout.painLevel || 0),
    nextTrainingNote: postWorkout.nextTrainingNote || ""
  };
}

function splitLegacySleepStatus(value) {
  const values = normalizeArray(value);
  const quality = values.find((item) => ["睡眠好", "睡眠一般", "睡眠差"].includes(item)) || "睡眠一般";
  const events = values.filter((item) => !["睡眠好", "睡眠一般", "睡眠差"].includes(item));
  return { quality, events };
}

function splitLegacyRecoveryStatus(value) {
  const values = normalizeArray(value);
  const status = values.find((item) => ["恢复良好", "恢复一般", "恢复差"].includes(item)) || "恢复一般";
  const sorenessParts = values.filter((item) => item !== status);
  return { status, sorenessParts: sorenessParts.length > 0 ? sorenessParts : ["无"] };
}

function getNormalizedTagArray(field, value) {
  const config = tagConfigs[field];
  if (!config) return normalizeArray(value);
  if (!isMultiTagMode(config)) return normalizeArray(value);
  return sanitizeTagValues(config, normalizeArray(value));
}

function getSingleValue(field, fallback = "") {
  const value = tagValues[field];
  return typeof value === "string" && value ? value : fallback;
}

function getMultiValueWithOther(field) {
  const values = normalizeArray(tagValues[field]);
  const otherInput = document.querySelector(`[data-other-for="${field}"]`);
  const otherText = otherInput ? otherInput.value.trim() : "";

  if (values.includes("其他") && otherText) {
    return values.map((item) => item === "其他" ? `其他：${otherText}` : item);
  }

  return values;
}

function cloneDefaultValue(config) {
  if (isMultiTagMode(config)) {
    return Array.isArray(config.defaultValue) ? [...config.defaultValue] : [];
  }

  return config.defaultValue || "";
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value) return [value];
  return [];
}

function hasMeaningfulValues(value) {
  const neutralValues = ["无", "正常", "一般", "动作标准", "睡眠一般", "饮食正常", "水分正常", "恢复良好", "恢复一般"];
  return normalizeArray(value).some((item) => !neutralValues.includes(item));
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatList(value, fallback = "无") {
  const values = normalizeArray(value);
  return values.length > 0 ? values.join("、") : fallback;
}

function formatDuration(seconds) {
  const totalSeconds = Math.max(0, Number(seconds) || 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const restSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
}

function formatTime(seconds) {
  const totalSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(totalSeconds / 60);
  const restSeconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
}

function formatNumber(number) {
  const value = Number(number) || 0;
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function formatInputNumber(number) {
  const value = Math.max(0, Number(number) || 0);
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readJsonStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeStorageItem(key) {
  localStorage.removeItem(key);
}

function loadHistory() {
  return readJsonStorage(STORAGE_KEYS.history, []);
}

function saveHistory() {
  writeJsonStorage(STORAGE_KEYS.history, historyRecords);
}

function loadTemplates() {
  try {
    const templates = readJsonStorage(STORAGE_KEYS.templates, []);
    return Array.isArray(templates) ? templates.map(normalizeTemplate).filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

function saveTemplates() {
  writeJsonStorage(STORAGE_KEYS.templates, trainingTemplates);
}

function normalizeTemplate(template) {
  if (!template || typeof template !== "object") return null;
  const exercises = Array.isArray(template.exercises) ? template.exercises : [];
  return {
    id: template.id || createId(),
    name: template.name || "未命名模板",
    createdAt: template.createdAt || new Date().toISOString(),
    bodyParts: normalizeArray(template.bodyParts),
    exercises: exercises.map((exercise) => ({
      exerciseName: exercise.exerciseName || exercise.name || "",
      targetMuscles: normalizeArray(exercise.targetMuscles || exercise.targetMuscle),
      exerciseType: exercise.exerciseType || "复合动作",
      plannedSets: Number(exercise.plannedSets) || 4,
      defaultRestSeconds: Number(exercise.defaultRestSeconds) || 120
    })).filter((exercise) => exercise.exerciseName)
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
