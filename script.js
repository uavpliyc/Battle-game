const damageRange = 0.3;
      criticalHitRate = 0.1;
let logIndex = 0,
    nowKilledNumber = 0,
    targetKillNumber = 2;

const playerData = {
  name: "プレイヤー",
  hp: 100,
  attack: 5,
  defence: 2
}

const enemiesData = [
  {
    name: "剣士",
    hp: 30,
    attack: 3,
    defence: 1
  },
  {
    name: "オーマイ",
    hp: 60,
    attack: 3,
    defence: 2
  },
  {
    name: "ゴーレム",
    hp: 80,
    attack: 4,
    defence: 3
  }
];

for (let i = 0; i < enemiesData.length; i++) {
  enemiesData[i]["maxHp"] = enemiesData[i]["hp"];
}
let enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];

function insertText(id, text) {
  document.getElementById(id).textContent = text;
}

function showModal(title, hiddenNextBtn = false) {
  document.getElementById("mask").classList.add("active");
  document.getElementById("modal").classList.add("active");
  document.getElementById("modalTitle").textContent = title;
  if (hiddenNextBtn) {
    document.getElementById("modalNextBtn").classList.add("hidden");
  }
}

function damageCalculation(attack, defence) {
  const maxDamage = attack * (1 + damageRange),
        minDamage = attack * (1 - damageRange),
        attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);

  const damage = attackDamage - defence;

  if (damage < 1) {
    return 0
  } else {
    return damage;
  }
}

function insertLog(texts) {
  const logsElement = document.getElementById("logs"),
        createLog = document.createElement("li");
  logIndex++;
  createLog.innerHTML = logIndex + ": " + texts;
  logsElement.insertBefore(createLog, logsElement.firstChild)
}

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);

insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

insertText("nowKilledNumber", nowKilledNumber);
insertText("targetKillNumber", targetKillNumber);

document.getElementById("attack").addEventListener("click", function() {
  let victory = false,
      defeat = false;

  const playerName = '<span style="color: blue;">' + playerData["name"] + "</span>",
        enemyName = '<span style="color: red;">' + enemyData["name"] + "</span>";

  // 敵への攻撃処理
  let playerDamage = damageCalculation(playerData["attack"], enemyData["defence"]);
  if (Math.random() < criticalHitRate) {
    playerDamage *= 2;
    insertLog(playerName + "の攻撃！クリティカルヒット！" + enemyName + "に" + playerDamage + "のダメージ！" )
  } else {
    insertLog(playerName + "の攻撃！" + enemyName + "に" + playerDamage + "のダメージ！" )
  }
  enemyData["hp"] -= playerDamage;
  insertText("currentEnemyHp", enemyData["hp"]);
  document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%";

  const enemyLeftHp = document.getElementById("currentEnemyHpGaugeValue").style.width;

  if (enemyLeftHp <= "20%") {
    document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "red";
  } else if (enemyLeftHp <= "50%") {
    document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "yellow";
  }

  if (enemyData["hp"] <= 0) {
    victory = true;
    enemyData["hp"] = 0;
    insertText("currentEnemyHp", enemyData["hp"]);
    document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
    showModal(enemyData["name"] + "を倒した！")
  }

  // プレイヤーへの攻撃処理
  if (!victory) {
    let enemyDamage = damageCalculation(enemyData["attack"], playerData["defence"]);
    if (Math.random() < criticalHitRate) {
      enemyDamage *= 2;
      insertLog(enemyName + "の攻撃！クリティカルヒット！" + playerName + "に" + enemyDamage + "のダメージ！" )
    } else {
      insertLog(enemyName + "の攻撃！" + playerName + "に" + enemyDamage + "のダメージ！" )
    }
    playerData["hp"] -= enemyDamage;
    insertText("currentPlayerHp", playerData["hp"]);
    document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"] * 100) + "%";

    const playerLeftHp = document.getElementById("currentPlayerHpGaugeValue").style.width;

    if (playerLeftHp <= "20%") {
      document.getElementById("currentPlayerHpGaugeValue").style.backgroundColor = "red";
    } else if (playerLeftHp <= "50%") {
      document.getElementById("currentPlayerHpGaugeValue").style.backgroundColor = "yellow";
    }

    if (playerData["hp"] <= 0) {
      defeat = true;
      playerData["hp"] = 0;
      insertText("currentPlayerHp", playerData["hp"]);
      document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";

      showModal(enemyData["name"] + "に負けた…", true)
    }
  }

  if (victory || defeat) {
    this.classList.add("deactive");
  }

  if (victory) {
    nowKilledNumber++;
    insertText("nowKilledNumber", nowKilledNumber);

    if (nowKilledNumber === targetKillNumber) {
      showModal("ゲームクリア！", true)
    }
  }

});

document.getElementById("modalNextBtn").addEventListener("click", function() {
  enemyData["hp"] = enemyData["maxHp"];
  enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];
  insertText("enemyName", enemyData["name"]);
  insertText("currentEnemyHp", enemyData["hp"]);
  insertText("maxEnemyHp", enemyData["hp"]);
  document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";
  document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "#6bf";

  document.getElementById("mask").classList.remove("active");
  document.getElementById("modal").classList.remove("active");
  document.getElementById("attack").classList.remove("deactive");
})



