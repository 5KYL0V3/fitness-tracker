const STORAGE_KEY = "fitnessWorkoutHistory";

const restRecommendations = {
  "复合动作": 120,
  "孤立动作": 75,
  "有氧": 60,
  "核心": 60,
  "热身": 45,
  "拉伸": 30
};

const painRiskNatures = ["刺痛", "锐痛", "麻木", "放射痛", "关节不适"];
const painPartOptions = ["无", "颈", "斜方肌", "肩前侧", "肩后侧", "肘", "腕", "胸", "肋部", "上背", "下背", "腰", "髋", "臀", "大腿前侧", "大腿后侧", "膝", "小腿", "踝", "足底", "其他"];
const painPartOptionsWithoutNone = painPartOptions.filter((item) => item !== "无");
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
    mode: "multi",
    options: ["正常", "精力好", "精力很足", "疲劳", "很疲劳", "困", "状态兴奋", "专注好", "专注差", "情绪一般", "压力大", "时间紧", "训练动力强", "训练动力低"],
    defaultValue: ["正常"],
    exclusive: ["正常"],
    defaultWhenEmpty: "正常"
  },
  sleepStatus: {
    mode: "multi",
    options: ["睡眠好", "睡眠一般", "睡眠不足", "熬夜", "失眠", "早醒", "午睡过", "睡太久", "起床困难"],
    defaultValue: []
  },
  nutritionStatus: {
    mode: "multi",
    options: ["饮食正常", "空腹", "饭后不久", "碳水充足", "碳水不足", "蛋白充足", "吃太撑", "饮食不足", "训练前加餐", "胃不舒服"],
    defaultValue: ["饮食正常"],
    exclusive: ["饮食正常"],
    defaultWhenEmpty: "饮食正常"
  },
  hydrationStatus: {
    mode: "multi",
    options: ["水分正常", "口渴", "喝水少", "出汗多", "出汗少", "天气热", "天气冷"],
    defaultValue: ["水分正常"],
    exclusive: ["水分正常"],
    defaultWhenEmpty: "水分正常"
  },
  supplements: {
    mode: "multi",
    options: ["无", "咖啡", "能量饮料", "氮泵", "肌酸", "蛋白粉", "其他"],
    defaultValue: ["无"],
    exclusive: ["无"],
    defaultWhenEmpty: "无"
  },
  recoveryStatus: {
    mode: "multi",
    options: ["无", "胸酸", "背酸", "肩酸", "腿酸", "臀酸", "手臂酸", "核心酸", "全身酸", "恢复良好", "恢复一般", "恢复差"],
    defaultValue: ["无"],
    exclusive: ["无"],
    defaultWhenEmpty: "无"
  },
  trainingEnvironment: {
    mode: "multi",
    options: ["正常", "人多", "器械等待", "临时换动作", "时间充足", "时间紧", "健身房拥挤", "状态被打断", "设备不熟悉"],
    defaultValue: ["正常"],
    exclusive: ["正常"],
    defaultWhenEmpty: "正常"
  },
  prePainParts: {
    mode: "multi",
    options: painPartOptions,
    defaultValue: ["无"],
    exclusive: ["无"],
    defaultWhenEmpty: "无"
  },
  prePainLevel: {
    mode: "single",
    options: painLevelOptions,
    defaultValue: "0"
  },
  targetMuscles: {
    mode: "multi",
    options: ["胸", "上胸", "下胸", "背", "上背", "下背", "肩前束", "肩中束", "肩后束", "腿", "臀", "股四头肌", "腘绳肌", "小腿", "二头", "三头", "核心", "全身"],
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
    mode: "multi",
    options: ["目标肌明显", "泵感强", "一般", "代偿明显", "关节不适", "左右不平衡", "控制感好", "控制感差", "拉伸感明显", "顶峰收缩明显"],
    defaultValue: ["一般"],
    exclusive: ["一般"],
    defaultWhenEmpty: "一般"
  },
  technique: {
    mode: "multi",
    options: ["动作标准", "动作变形", "幅度不足", "节奏太快", "节奏稳定", "离心控制好", "离心控制差", "借力明显", "呼吸混乱", "核心不稳", "握力不足", "左右不平衡"],
    defaultValue: ["动作标准"]
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
    mode: "multi",
    options: painPartOptionsWithoutNone,
    defaultValue: []
  },
  setPainNature: {
    mode: "multi",
    options: ["酸胀", "刺痛", "锐痛", "钝痛", "麻木", "放射痛", "牵拉感", "卡住感", "灼热感", "关节不适", "肌肉抽筋"],
    defaultValue: []
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
    mode: "multi",
    options: ["正常", "状态不错", "疲劳明显", "非常累", "泵感强", "没练透", "动作质量好", "动作质量差", "训练被打断", "时间不够"],
    defaultValue: ["正常"],
    exclusive: ["正常"],
    defaultWhenEmpty: "正常"
  },
  postPainParts: {
    mode: "multi",
    options: painPartOptions,
    defaultValue: ["无"],
    exclusive: ["无"],
    defaultWhenEmpty: "无"
  },
  postPainLevel: {
    mode: "single",
    options: painLevelOptions,
    defaultValue: "0"
  }
};

const todayRecords = [];
let workoutStartedAt = null;
let historyRecords = loadHistory();
let expandedHistoryId = null;
let tagValues = {};

const timerState = {
  remaining: restRecommendations["复合动作"],
  intervalId: null,
  running: false
};

const dom = {
  workoutDate: document.getElementById("workoutDate"),
  dailyNote: document.getElementById("dailyNote"),
  prePainNote: document.getElementById("prePainNote"),
  exerciseSelect: document.getElementById("exerciseSelect"),
  exerciseManual: document.getElementById("exerciseManual"),
  plannedSets: document.getElementById("plannedSets"),
  defaultRest: document.getElementById("defaultRest"),
  currentSetLabel: document.getElementById("currentSetLabel"),
  weightInput: document.getElementById("weightInput"),
  repsInput: document.getElementById("repsInput"),
  setNote: document.getElementById("setNote"),
  setPainNote: document.getElementById("setPainNote"),
  setPainWarning: document.getElementById("setPainWarning"),
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
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  historyList: document.getElementById("historyList"),
  generateAiBtn: document.getElementById("generateAiBtn"),
  copyAiBtn: document.getElementById("copyAiBtn"),
  aiOutput: document.getElementById("aiOutput"),
  copyStatus: document.getElementById("copyStatus")
};

init();

function init() {
  dom.workoutDate.value = getTodayDateString();
  setupTagGroups();
  setRecommendedRest();
  timerState.remaining = getDefaultRestSeconds();
  bindEvents();
  updateCurrentSetLabel();
  updateRestContext();
  updateTimerDisplay();
  updateSetPainWarning();
  renderRecords();
  updateSummary();
  renderHistory();

  setInterval(updateSummary, 1000);
}

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

function bindEvents() {
  document.addEventListener("click", handleTagClick);

  dom.exerciseSelect.addEventListener("change", () => {
    updateCurrentSetLabel();
    updateRestContext();
    renderRecords();
  });
  dom.exerciseManual.addEventListener("input", () => {
    updateCurrentSetLabel();
    updateRestContext();
    renderRecords();
  });
  dom.plannedSets.addEventListener("input", () => {
    updateCurrentSetLabel();
    updateRestContext();
    renderRecords();
  });

  dom.defaultRest.addEventListener("input", syncTimerWithDefaultRest);
  dom.copyLastSetBtn.addEventListener("click", copyLastSet);
  dom.completeSetBtn.addEventListener("click", completeCurrentSet);

  dom.startRestBtn.addEventListener("click", () => startRestTimer(getDefaultRestSeconds()));
  dom.pauseRestBtn.addEventListener("click", togglePauseTimer);
  dom.addRestBtn.addEventListener("click", () => adjustTimer(30));
  dom.minusRestBtn.addEventListener("click", () => adjustTimer(-15));
  dom.skipRestBtn.addEventListener("click", skipRest);

  dom.recordsList.addEventListener("click", handleRecordActions);

  dom.saveTodayBtn.addEventListener("click", saveTodayWorkout);
  dom.viewHistoryBtn.addEventListener("click", toggleHistory);
  dom.clearHistoryBtn.addEventListener("click", clearHistory);
  dom.historyList.addEventListener("click", handleHistoryClick);

  dom.generateAiBtn.addEventListener("click", generateAiText);
  dom.copyAiBtn.addEventListener("click", copyAiText);
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
    const exclusive = config.exclusive || [];
    let values = normalizeArray(tagValues[field]);

    if (exclusive.includes(value)) {
      values = [value];
    } else {
      values = values.filter((item) => !exclusive.includes(item));
      values = values.includes(value)
        ? values.filter((item) => item !== value)
        : values.concat(value);
    }

    if (values.length === 0 && config.defaultWhenEmpty) {
      values = [config.defaultWhenEmpty];
    }

    tagValues[field] = values;
  }

  updateTagGroup(field);
  updateOtherInputs();
  handleTagSideEffects(field);
}

function handleTagSideEffects(field) {
  if (field === "exerciseType") {
    setRecommendedRest();
    syncTimerWithDefaultRest();
  }

  if (["setPainTiming", "setPainParts", "setPainNature", "setPainLevel"].includes(field)) {
    updateSetPainWarning();
  }

  if (["exerciseType", "targetMuscles", "bodyParts", "mainGoal", "dailyStatus", "sleepStatus", "nutritionStatus", "hydrationStatus", "prePainParts", "prePainLevel", "postFeeling", "postPainParts", "postPainLevel"].includes(field)) {
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
  const values = config.mode === "multi" ? normalizeArray(tagValues[field]) : [tagValues[field]];

  group.querySelectorAll(".tag-button").forEach((button) => {
    button.classList.toggle("active", values.includes(button.dataset.value));
  });
}

function setTagValue(field, value) {
  if (!tagConfigs[field]) return;
  tagValues[field] = Array.isArray(value) ? [...value] : value;
  updateTagGroup(field);
  updateOtherInputs();
  handleTagSideEffects(field);
}

function updateOtherInputs() {
  document.querySelectorAll("[data-other-for]").forEach((input) => {
    const field = input.dataset.otherFor;
    const values = normalizeArray(tagValues[field]);
    input.classList.toggle("hidden", !values.includes("其他"));
  });
}

function getCurrentExerciseName() {
  const manualName = dom.exerciseManual.value.trim();
  return manualName || dom.exerciseSelect.value;
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

function getNextSetNumber(exerciseName) {
  return todayRecords.filter((record) => record.exerciseName === exerciseName).length + 1;
}

function completeCurrentSet() {
  const settings = getCurrentExerciseSettings();
  const weight = Number(dom.weightInput.value);
  const reps = Number(dom.repsInput.value);

  if (!settings.exerciseName) {
    alert("请填写动作名称");
    return;
  }

  if (!Number.isFinite(weight) || weight < 0) {
    alert("请填写有效重量");
    dom.weightInput.focus();
    return;
  }

  if (!Number.isFinite(reps) || reps <= 0) {
    alert("请填写有效次数");
    dom.repsInput.focus();
    return;
  }

  if (!getSingleValue("rir")) {
    alert("请选择 RIR：还能做几次");
    return;
  }

  if (!workoutStartedAt) {
    workoutStartedAt = Date.now();
  }

  const record = {
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

  todayRecords.push(record);
  prepareNextSet(record);
  renderRecords();
  updateSummary();
  updateCurrentSetLabel();
  updateRestContext();
  startRestTimer(settings.defaultRestSeconds);
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
  setTagValue("setPainParts", []);
  setTagValue("setPainNature", []);
  setTagValue("setPainLevel", "0");
  setTagValue("painActions", []);
  updateSetPainWarning();
}

function copyLastSet() {
  const lastRecord = todayRecords[todayRecords.length - 1];

  if (!lastRecord) {
    alert("还没有上一组可以复制");
    return;
  }

  dom.weightInput.value = lastRecord.weight;
  dom.repsInput.value = lastRecord.reps;
  setTagValue("stability", lastRecord.stability);
  setTagValue("feeling", lastRecord.feeling);
  setTagValue("rir", lastRecord.rir);
  setTagValue("rpe", lastRecord.rpe === "未填" ? "" : lastRecord.rpe);
  setTagValue("force", normalizeArray(lastRecord.force));
}

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

    if (timerState.remaining <= 0) {
      finishRest();
    }
  }, 1000);
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
    return;
  }

  timerState.running = true;
  setTimerMessage("休息中");
  timerState.intervalId = setInterval(() => {
    timerState.remaining -= 1;
    updateTimerDisplay();

    if (timerState.remaining <= 0) {
      finishRest();
    }
  }, 1000);
}

function adjustTimer(deltaSeconds) {
  timerState.remaining = Math.max(0, timerState.remaining + deltaSeconds);
  updateTimerDisplay();

  if (timerState.remaining === 0) {
    finishRest();
  }
}

function skipRest() {
  clearTimerInterval();
  timerState.running = false;
  timerState.remaining = 0;
  updateTimerDisplay();
  setTimerMessage("已跳过休息");
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

        <div class="set-list" aria-label="${escapeHtml(exercise.name)}的组记录">
          ${exercise.records.map((record) => renderSetRow(record)).join("")}
        </div>

        <button class="delete-exercise-btn small-danger" type="button" data-delete-exercise="${encodeURIComponent(exercise.name)}">删除整个动作</button>
      </article>
    `;
  }).join("");
}

function renderSetRow(record) {
  const painSummary = getPainSummary(record.pain);

  return `
    <div class="set-row">
      <div class="set-info">
        <strong>第 ${record.setNumber} 组：</strong>
        ${escapeHtml(record.setType || "正式组")}｜${formatNumber(record.weight)}kg × ${record.reps}次｜${escapeHtml(record.stability)}｜RIR ${escapeHtml(record.rir)}｜RPE ${escapeHtml(record.rpe)}｜${escapeHtml(record.feeling)}｜${escapeHtml(formatList(record.force))}
        <div class="set-tech">技术：${escapeHtml(formatList(record.technique))}</div>
        ${painSummary ? `<div class="set-pain">疼痛：${escapeHtml(painSummary)}</div>` : ""}
      </div>
      <button class="small-danger" type="button" data-delete-record="${record.id}">删除本组</button>
    </div>
  `;
}

function handleRecordActions(event) {
  const deleteExerciseButton = event.target.closest("[data-delete-exercise]");
  if (deleteExerciseButton) {
    const exerciseName = decodeURIComponent(deleteExerciseButton.dataset.deleteExercise);
    const shouldDelete = confirm(`确定删除「${exerciseName}」的全部组记录吗？`);
    if (!shouldDelete) return;

    for (let index = todayRecords.length - 1; index >= 0; index -= 1) {
      if (todayRecords[index].exerciseName === exerciseName) {
        todayRecords.splice(index, 1);
      }
    }

    renumberSets();
    renderRecords();
    updateSummary();
    updateCurrentSetLabel();
    updateRestContext();
    return;
  }

  const deleteButton = event.target.closest("[data-delete-record]");
  if (!deleteButton) return;

  const recordIndex = todayRecords.findIndex((record) => record.id === deleteButton.dataset.deleteRecord);
  if (recordIndex === -1) return;

  todayRecords.splice(recordIndex, 1);
  renumberSets();
  renderRecords();
  updateSummary();
  updateCurrentSetLabel();
  updateRestContext();
}

function renumberSets() {
  const counts = {};
  todayRecords.forEach((record) => {
    counts[record.exerciseName] = (counts[record.exerciseName] || 0) + 1;
    record.setNumber = counts[record.exerciseName];
  });
}

function getTodayInfo() {
  return {
    date: dom.workoutDate.value,
    bodyParts: getMultiValueWithOther("bodyParts"),
    mainGoal: getSingleValue("mainGoal"),
    secondaryGoals: getMultiValueWithOther("secondaryGoals"),
    dailyStatus: getMultiValueWithOther("dailyStatus"),
    sleepStatus: getMultiValueWithOther("sleepStatus"),
    nutritionStatus: getMultiValueWithOther("nutritionStatus"),
    hydrationStatus: getMultiValueWithOther("hydrationStatus"),
    supplements: getMultiValueWithOther("supplements"),
    trainingEnvironment: getMultiValueWithOther("trainingEnvironment"),
    dailyNote: dom.dailyNote.value.trim()
  };
}

function getPreWorkoutInfo() {
  return {
    recoveryStatus: getMultiValueWithOther("recoveryStatus"),
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
    id: createId(),
    savedAt: new Date().toISOString(),
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

function saveTodayWorkout() {
  if (todayRecords.length === 0) {
    alert("请至少完成一组后再保存");
    return;
  }

  const workout = buildWorkoutSnapshot(getTrainingDurationSeconds());
  historyRecords.unshift(workout);
  saveHistory();
  renderHistory();
  updateSummary();
  alert("今日训练已保存");
}

function toggleHistory() {
  dom.historyList.classList.toggle("hidden");
  renderHistory();
}

function renderHistory() {
  if (dom.historyList.classList.contains("hidden")) return;

  if (historyRecords.length === 0) {
    dom.historyList.innerHTML = '<p class="empty">暂无历史记录</p>';
    return;
  }

  dom.historyList.innerHTML = historyRecords.map((workout) => {
    const isExpanded = expandedHistoryId === workout.id;
    const stats = workout.stats || calculateStats(workout.records || [], 0);
    const info = normalizeInfo(workout.info || {});
    const painRisk = getWorkoutPainRisk(workout);
    const detail = isExpanded ? renderHistoryDetail(workout) : "";

    return `
      <article class="history-item ${painRisk.hasRisk ? "has-risk" : ""}">
        <div class="history-main" data-toggle-history="${workout.id}">
          <div>
            <p class="history-title">${escapeHtml(info.date || "未记录日期")} · ${escapeHtml(formatList(info.bodyParts, "未记录部位"))}</p>
            <div class="history-meta">
              主目标：${escapeHtml(info.mainGoal || "未记录")} · ${formatDuration(stats.durationSeconds || 0)} · ${stats.totalSets || 0}组 · Volume（训练量）：${formatNumber(stats.totalVolume || 0)}kg
              ${painRisk.hasRisk ? "<br>⚠️ 有不适风险提示" : ""}
            </div>
          </div>
        </div>
        <div class="history-actions">
          <button type="button" data-toggle-history="${workout.id}">${isExpanded ? "收起详情" : "查看详情"}</button>
          <button class="small-danger" type="button" data-delete-history="${workout.id}">删除</button>
        </div>
        ${detail}
      </article>
    `;
  }).join("");
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

    historyRecords = historyRecords.filter((workout) => workout.id !== deleteButton.dataset.deleteHistory);
    saveHistory();
    renderHistory();
    updateSummary();
  }
}

function clearHistory() {
  const shouldClear = confirm("确定清空所有历史记录吗？这个操作不能撤销。");
  if (!shouldClear) return;

  historyRecords = [];
  expandedHistoryId = null;
  saveHistory();
  renderHistory();
  updateSummary();
}

function generateAiText() {
  const snapshot = buildWorkoutSnapshot();
  dom.aiOutput.value = buildAiText(snapshot, true);
  dom.copyStatus.textContent = "AI 分析文本已生成";
}

async function copyAiText() {
  if (!dom.aiOutput.value.trim()) {
    generateAiText();
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

function buildAiText(workout, includeRequest) {
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

  const requestText = includeRequest ? `

请帮我分析：
1. 今天训练质量如何？
2. 哪些动作下次可以加重量？
3. 哪些动作应该保持或降重量？
4. 动作稳定性、发力感和技术表现有什么问题？
5. 疼痛 / 不适信号是否需要调整训练安排？
6. 下次同部位训练应该怎么安排？` : "";

  return `日期：${info.date || "未记录"}
训练部位：${formatList(info.bodyParts)}
训练主目标：${info.mainGoal || "未记录"}
辅助目标：${formatList(info.secondaryGoals)}
今日综合状态：${formatList(info.dailyStatus)}
睡眠状态：${formatList(info.sleepStatus)}
饮食状态：${formatList(info.nutritionStatus)}
水分 / 出汗状态：${formatList(info.hydrationStatus)}
咖啡因 / 补剂记录：${formatList(info.supplements)}
训练环境：${formatList(info.trainingEnvironment)}
今日备注：${info.dailyNote || "无"}
总训练时长：${formatDuration(stats.durationSeconds || 0)}

练前状态：
练前恢复状态 / 肌肉酸痛：${formatList(preWorkout.recoveryStatus)}
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
    lines.push(`组${record.setNumber}（${record.setType || "正式组"}）：重量 ${formatNumber(record.weight)}kg，次数 ${record.reps}次，稳定性：${record.stability || "未记录"}，感受：${record.feeling || "未记录"}，RIR（还能做几次）：${record.rir || "未记录"}，RPE（主观用力程度）：${record.rpe || "未填"}，发力感：${formatList(record.force)}，技术表现：${formatList(record.technique)}，疼痛 / 不适反馈：${getPainSummary(record.pain) || "无"}，备注：${record.note || "无"}`);
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

function getTrainingDurationSeconds() {
  if (!workoutStartedAt) return 0;
  return Math.max(0, Math.floor((Date.now() - workoutStartedAt) / 1000));
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
  const nature = normalizeArray(pain.nature);
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
    signals.push(`${record.exerciseName} 第${record.setNumber}组：部位 ${formatList(pain.parts)}，性质 ${formatList(pain.nature)}，程度 ${Number(pain.level || 0)}/10，时机 ${pain.timing || "未记录"}，应对方式 ${formatList(pain.actions)}`);
  });

  if (Number(postWorkout.painLevel) >= 4) {
    signals.push(`训练后：部位 ${formatList(postWorkout.painParts)}，程度 ${postWorkout.painLevel}/10，下次备注：${postWorkout.nextTrainingNote || "无"}`);
  }

  return signals;
}

function getPainSummary(pain) {
  if (!pain) return "";
  const level = Number(pain.level || 0);
  const hasPain = pain.timing !== "无" || level > 0 || normalizeArray(pain.parts).length > 0 || normalizeArray(pain.nature).length > 0;
  if (!hasPain) return "";

  const parts = formatList(pain.parts, "未记录部位");
  const nature = formatList(pain.nature, "未记录性质");
  const actions = formatList(pain.actions, "未记录应对");
  return `${parts} ${nature} ${level}/10，${pain.timing || "未记录时机"}，${actions}`;
}

function getStatusSummary(workout) {
  const info = normalizeInfo(workout.info || {});
  return [
    `综合：${formatList(info.dailyStatus)}`,
    `睡眠：${formatList(info.sleepStatus)}`,
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
  return {
    date: info.date || "",
    bodyParts: normalizeArray(info.bodyParts || info.bodyPart),
    mainGoal: info.mainGoal || info.trainingGoal || "",
    secondaryGoals: normalizeArray(info.secondaryGoals),
    dailyStatus: normalizeArray(info.dailyStatus || info.dailyCondition),
    sleepStatus: normalizeArray(info.sleepStatus),
    nutritionStatus: normalizeArray(info.nutritionStatus),
    hydrationStatus: normalizeArray(info.hydrationStatus),
    supplements: normalizeArray(info.supplements),
    trainingEnvironment: normalizeArray(info.trainingEnvironment),
    dailyNote: info.dailyNote || ""
  };
}

function normalizePreWorkout(preWorkout) {
  return {
    recoveryStatus: normalizeArray(preWorkout.recoveryStatus),
    painParts: normalizeArray(preWorkout.painParts),
    painLevel: Number(preWorkout.painLevel || 0),
    painNote: preWorkout.painNote || ""
  };
}

function normalizePostWorkout(postWorkout) {
  return {
    feeling: normalizeArray(postWorkout.feeling),
    painParts: normalizeArray(postWorkout.painParts),
    painLevel: Number(postWorkout.painLevel || 0),
    nextTrainingNote: postWorkout.nextTrainingNote || ""
  };
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
  if (config.mode === "multi") {
    return Array.isArray(config.defaultValue) ? [...config.defaultValue] : [];
  }

  return config.defaultValue || "";
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value) return [value];
  return [];
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

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historyRecords));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
