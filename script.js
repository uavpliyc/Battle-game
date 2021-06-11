const damageRange = 0.3;

const playerData = {
  name: "プレイヤー",
  hp: 100,
  attack: 5,
  defence: 2
}

const enemyData = {
  name: "相手",
  hp: 100,
  attack: 4,
  defence: 1
}

playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];

function insertText(id, text) {
  document.getElementById(id).textContent = text;
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

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);

insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

document.getElementById("attack").addEventListener("click", function() {
  let endGame = false;

  const playerDamage = damageCalculation(playerData["attack"], enemyData["defence"]),
        enemyDamage = damageCalculation(enemyData["attack"], playerData["defence"])

  enemyData["hp"] -= playerDamage;
  playerData["hp"] -= enemyDamage;

  insertText("currentEnemyHp", enemyData["hp"]);
  insertText("currentPlayerHp", playerData["hp"]);

  document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%";
  document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"] * 100) + "%";

  const leftHp = document.getElementById("currentEnemyHpGaugeValue").style.width;

  if (leftHp <= "50%") {
    document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "yellow";
  }
  if (leftHp <= "20%") {
    document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "red";
  }

  if (enemyData["hp"] <= 0) {
    alert("勝利！");
    endGame = true;
    enemyData["hp"] = 0;
    insertText("currentEnemyHp", enemyData["hp"]);
    document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
  } else if (playerData["hp"] <= 0) {
    alert("敗北...");
    endGame = true;
    playerData["hp"] = 0;
    insertText("currentPlayerHp", playerData["hp"]);
    document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
  }

  if (endGame) {
  this.classList.add("deactive");
  }
});