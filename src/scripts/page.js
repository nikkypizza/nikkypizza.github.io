const codewarsNode = document.querySelector('.codewars');
fetch('https://www.codewars.com/api/v1/users/nikkypizza')
  .then((res) => res.json())
  .then(({ ranks: { overall: { name } }, codeChallenges: { totalCompleted }, honor }) => codewarsNode.textContent = `${name}, completed: ${totalCompleted}, honor: ${honor}`)
  .catch((e) => codewarsNode.textContent = 'nikkypizza');

const leetCodeNode = document.querySelector('.leetcode');
fetch('https://alfa-leetcode-api.onrender.com/userProfile/nikkypizza')
.then((res) => res.json())
.then((user) => leetCodeNode.textContent = `completed: ${user.totalSolved}`)
.catch((e) => leetCodeNode.textContent = 'nikkypizza');

const toWorksLink = document.querySelector('.toggler-label');
toWorksLink.addEventListener('click', () => ymReachGoal('clickWorks'), {once: true})

// Апишку CSSBattle закрыли корсом :'(

/*
 const cssBattleNode = document.querySelector('.cssbattle');

 fetch('https://us-central1-cssbattleapp.cloudfunctions.net/getRank?userId=8icQsvYbk0ZtKe1uUM6RPSLJtAd2')
 fetch('https://cssbattle.dev/api/getRank?userId=8icQsvYbk0ZtKe1uUM6RPSLJtAd2')
   .then(res => res.json())
   .then(({ score, rank }) => cssBattleNode.textContent = (`score: ${new Intl.NumberFormat('ru-RU').format(Math.round(score))}, rank: #${rank}`))
   .catch((e) => cssBattleNode.textContent = 'nikkypizza');
*/