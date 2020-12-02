console.log("Hero Combat");

//a hősnek van 60 élete és sebez 6-8-ig,
//az ellenfél pedig 5-7-es ütéssel üt, és van 70 élete,
//10 körük van legyőzni egymást, a végén írja ki, hogy ki nyert
//a karakterek dobnak egy értéket 1-100-ig, aki nagyobbat dob, az üthet elsőnek.
//továbbá egy körön belül 20% esély van rá, hogy melléüt(0 sebzés),
//és 30% esély, hogy kétszeres sebzést okoz,
//és ez a kettő akár egyszerre is történhet.

let heroHP = 60;
const heroDMGmin = 6;
const heroDMGmax = 8;

let villainHP = 70;
const villainDMGmin = 5;
const villainDMGmax = 7;

const lastRound = 10;
let roundCounter = 0;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceInPercentage() {
  return Math.random() * 100;
}

function getAttackDamage(fighter) {
  let attack = null;
  const missChance = chanceInPercentage();
  const doubeDmgChance = chanceInPercentage();

  if (fighter === "hero") {
    attack = randomIntFromInterval(heroDMGmin, heroDMGmax);
  }

  if (fighter === "villain") {
    attack = randomIntFromInterval(villainDMGmin, villainDMGmax);
  }

  if (missChance < 20) {
    return 0;
  } else if (doubeDmgChance < 30) {
    return attack * 2;
  } else {
    return attack;
  }
}

function isVillainLost() {
  if (villainHP <= 0) {
    console.log("Hero win! Fairy tale cliché booooo");
    return true;
  } else {
    return false;
  }
}

function isHeroLost() {
  if (heroHP <= 0) {
    console.log("Villain win! Darkness covers the Earth!");
    return true;
  } else {
    return false;
  }
}

function heroAttackFirst(heroAttackDmg, villainAttackDmg) {
  console.log(`Hero attack first with ${heroAttackDmg} Dmg!`);
  villainHP -= heroAttackDmg;
  console.log(`Villain HP: ${villainHP}`);

  if (isVillainLost()) {
    return true;
  }

  console.log(`Villain attacks with ${villainAttackDmg} Dmg!`);
  heroHP -= villainAttackDmg;
  console.log(`Hero HP: ${heroHP}`);

  if (isHeroLost()) {
    return true;
  }
}

function villainAttackFirst(villainAttackDmg, heroAttackDmg) {
  console.log(`Villain attack first with ${villainAttackDmg} Dmg!`);
  heroHP -= villainAttackDmg;
  console.log(`Hero HP: ${heroHP}`);

  if (isHeroLost()) {
    return true;
  }

  console.log(`Hero attacks with ${heroAttackDmg} Dmg!`);
  villainHP -= heroAttackDmg;
  console.log(`Villain HP: ${villainHP}`);

  if (isVillainLost()) {
    return true;
  }
}

function fight(firstAttacker) {
  const villainAttackDmg = getAttackDamage("villain");
  const heroAttackDmg = getAttackDamage("hero");

  if (firstAttacker === "hero") {
    if (heroAttackFirst(heroAttackDmg, villainAttackDmg)) {
      return true;
    }
  } else if (firstAttacker === "villain") {
    if (villainAttackFirst(villainAttackDmg, heroAttackDmg)) {
      return true;
    }
  } else {
    console.log("Error");
  }
}

for (let i = 0; i < lastRound; i++) {
  roundCounter++;
  console.log(`-----Round ${roundCounter} Fight!-----`);

  let heroRolledValue = randomIntFromInterval(1, 100);

  let villainRolledValue = randomIntFromInterval(1, 100);

  while (heroRolledValue === villainRolledValue) {
    heroRolledValue = randomIntFromInterval(1, 100);
    villainRolledValue = randomIntFromInterval(1, 100);
  }

  console.log(`Hero rolled : ${heroRolledValue}`);
  console.log(`Villain rolled : ${villainRolledValue}`);

  if (heroRolledValue > villainRolledValue) {
    if (fight("hero")) {
      break;
    }
  } else {
    if (fight("villain")) {
      break;
    }
  }
}
