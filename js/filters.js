// not exactly vanilla as there is one lodash function

var allCheckboxes = document.querySelectorAll('.checkbox');
var allPlayers = Array.from(document.querySelectorAll('.akce__item'));
var checked = {};

getChecked('TypAkce');
getChecked('DobaKonani');
getChecked('KrouzkyPodleVeku');
getChecked('AktivityPodleVeku');
getChecked('Vylety');
// getChecked('position');
// getChecked('nbaTeam');
// getChecked('conference');

Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener('change', toggleCheckbox);
});

function toggleCheckbox(e) {
  getChecked(e.target.name);
  setVisibility();
}

function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
    return el.value;
  });
}

function setVisibility() {
  allPlayers.map(function (el) {
    var TypAkce = checked.TypAkce.length ? _.intersection(Array.from(el.classList), checked.TypAkce).length : true;
    var DobaKonani = checked.DobaKonani.length ? _.intersection(Array.from(el.classList), checked.DobaKonani).length : true;
    var KrouzkyPodleVeku = checked.KrouzkyPodleVeku.length ? _.intersection(Array.from(el.classList), checked.KrouzkyPodleVeku).length : true;
    var AktivityPodleVeku = checked.AktivityPodleVeku.length ? _.intersection(Array.from(el.classList), checked.AktivityPodleVeku).length : true;
    var Vylety = checked.Vylety.length ? _.intersection(Array.from(el.classList), checked.Vylety).length : true;
    // var position = checked.position.length ? _.intersection(Array.from(el.classList), checked.position).length : true;
    // var nbaTeam = checked.nbaTeam.length ? _.intersection(Array.from(el.classList), checked.nbaTeam).length : true;
    // var conference = checked.conference.length ? _.intersection(Array.from(el.classList), checked.conference).length : true;
    // if (startingReserves && injured && position && nbaTeam && conference) {
    if (TypAkce && DobaKonani && KrouzkyPodleVeku && AktivityPodleVeku && Vylety) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}