document.addEventListener('DOMContentLoaded', () => {
  const degreesInput = document.getElementById('degrees');
  const unitSelect = document.getElementById('unitType');
  const convertBtn = document.getElementById('convertBtn');
  const resetBtn = document.getElementById('resetBtn');
  const errorMsg = document.getElementById('errorMsg');

  const resCelsius = document.getElementById('resCelsius');
  const resFahrenheit = document.getElementById('resFahrenheit');
  const resKelvin = document.getElementById('resKelvin');

  // Convert logic
  function convertTemperature() {
    const rawVal = degreesInput.value.trim();

    // Reset error
    errorMsg.style.display = 'none';
    errorMsg.innerText = '';

    if (rawVal === '') {
      showError('Please enter a temperature value.');
      return;
    }

    const temp = parseFloat(rawVal);
    if (isNaN(temp)) {
      showError('Invalid input. Please enter a valid number.');
      return;
    }

    const unit = unitSelect.value;
    let c, f, k;

    if (unit === 'celsius') {
      c = temp;
      f = (temp * 9) / 5 + 32;
      k = temp + 273.15;
    } else if (unit === 'fahrenheit') {
      c = ((temp - 32) * 5) / 9;
      f = temp;
      k = c + 273.15;
    } else if (unit === 'kelvin') {
      c = temp - 273.15;
      f = (c * 9) / 5 + 32;
      k = temp;
    }

    // Absolute zero check (cannot be colder than 0 Kelvin / -273.15 Celsius)
    if (k < 0) {
      showError('Value is below Absolute Zero (−273.15°C / 0 K). Physics violation!');
      clearOutputs();
      return;
    }

    // Format results to 2 decimal places
    resCelsius.innerText = `${c.toFixed(2)} °C`;
    resFahrenheit.innerText = `${f.toFixed(2)} °F`;
    resKelvin.innerText = `${k.toFixed(2)} K`;
  }

  function showError(msg) {
    errorMsg.innerText = msg;
    errorMsg.style.display = 'block';
  }

  function clearOutputs() {
    resCelsius.innerText = '--';
    resFahrenheit.innerText = '--';
    resKelvin.innerText = '--';
  }

  function resetAll() {
    degreesInput.value = '';
    unitSelect.value = 'celsius';
    errorMsg.style.display = 'none';
    clearOutputs();
    degreesInput.focus();
  }

  // Event Listeners
  convertBtn.addEventListener('click', convertTemperature);
  resetBtn.addEventListener('click', resetAll);
  
  // Allow Enter key to calculate
  degreesInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      convertTemperature();
    }
  });
});
