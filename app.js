(() => {
  const form = document.querySelector('#surveyForm');
  const userName = document.querySelector('#userName');
  const userEmail = document.querySelector('#userEmail');
  const slider = document.querySelector('#aiUsage');
  const output = document.querySelector('#usageOutput');
  const useCases = document.querySelector('#useCases');
  const otherToolOption = document.querySelector('#otherToolOption');
  const otherTools = document.querySelector('#otherTools');
  const planType = document.querySelector('#planType');
  const spendField = document.querySelector('#spendField');
  const paidAmount = document.querySelector('#paidAmount');
  const currency = document.querySelector('#currency');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const count = document.querySelector('#characterCount');
  const progressBar = document.querySelector('#progressBar');
  const progressText = document.querySelector('#progressText');
  const toolsError = document.querySelector('#toolsError');
  const status = document.querySelector('#formStatus');
  const button = document.querySelector('#submitButton');
  const modal = document.querySelector('#successModal');

  const updateSlider = () => { output.innerHTML = `${slider.value}<span>%</span>`; slider.style.setProperty('--value', `${slider.value}%`); updateProgress(); };
  const isPaidPlan = () => planType.value === 'Paid tools';
  const syncExtras = () => {
    const showSpend = isPaidPlan();
    spendField.hidden = !showSpend;
    if (!showSpend) { paidAmount.value = ''; paidAmount.setCustomValidity(''); }
    if (!otherToolOption.checked) otherTools.setCustomValidity('');
    updateProgress();
  };
  const updateProgress = () => {
    const hasName = userName.value.trim().length > 0;
    const hasEmail = emailPattern.test(userEmail.value.trim());
    const hasTools = [...form.querySelectorAll('[name="tools"]')].some((item) => item.checked);
    const hasUseCase = useCases.value.trim().length > 0;
    const complete = (1 + Number(hasName) + Number(hasEmail) + Number(hasTools) + Number(hasUseCase)) / 5;
    progressBar.style.width = `${complete * 100}%`;
    progressText.textContent = `${Math.round(complete * 100)}% complete`;
  };
  slider.addEventListener('input', updateSlider);
  userName.addEventListener('input', () => { userName.setCustomValidity(''); updateProgress(); });
  userEmail.addEventListener('input', () => { userEmail.setCustomValidity(''); updateProgress(); });
  form.querySelectorAll('[name="tools"]').forEach((item) => item.addEventListener('change', () => { toolsError.textContent = ''; syncExtras(); }));
  planType.addEventListener('change', syncExtras);
  otherTools.addEventListener('input', () => otherTools.setCustomValidity(''));
  paidAmount.addEventListener('input', () => paidAmount.setCustomValidity(''));
  useCases.addEventListener('input', () => { count.textContent = useCases.value.length; updateProgress(); });
  updateSlider();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    const name = userName.value.trim();
    const email = userEmail.value.trim();
    const tools = [...form.querySelectorAll('[name="tools"]:checked')].map((item) => item.value);
    const otherName = otherTools.value.trim();
    const purpose = useCases.value.trim();
    const paid = isPaidPlan();
    const amount = paidAmount.value.trim();
    let valid = true;
    if (!name) { userName.setCustomValidity('Please enter your name.'); valid = false; } else userName.setCustomValidity('');
    if (!emailPattern.test(email)) { userEmail.setCustomValidity('Please enter a valid email address.'); valid = false; } else userEmail.setCustomValidity('');
    if (!tools.length) { toolsError.textContent = 'Please select at least one tool.'; valid = false; }
    if (otherToolOption.checked && !otherName) { otherTools.setCustomValidity('Please name the other tool.'); valid = false; } else otherTools.setCustomValidity('');
    if (paid && (amount === '' || !Number.isFinite(Number(amount)) || Number(amount) < 0)) { paidAmount.setCustomValidity('Please enter the amount you pay.'); valid = false; } else paidAmount.setCustomValidity('');
    if (!purpose) { useCases.setCustomValidity('Please tell us how you use these tools.'); valid = false; } else useCases.setCustomValidity('');
    if (!valid) { form.reportValidity(); return; }
    const payload = { submittedAt: new Date().toISOString(), userName: name, userEmail: email, aiUsagePercent: Number(slider.value), tools, otherTools: otherName, planType: planType.value, paidAmount: paid ? Number(amount) : '', currency: paid ? currency.value : '', useCases: purpose };
    const endpoint = window.SURVEY_CONFIG?.GOOGLE_APPS_SCRIPT_URL;
    if (!endpoint) { status.className = 'form-status error'; status.textContent = 'Form is ready, but the Google Sheets endpoint has not been configured yet. Add it in config.js.'; return; }
    button.disabled = true; button.classList.add('is-loading'); button.querySelector('span').textContent = 'Sending…';
    try {
      await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
      modal.hidden = false;
    } catch (error) {
      status.className = 'form-status error'; status.textContent = 'We could not send your response. Please check your connection and try again.';
    } finally { button.disabled = false; button.classList.remove('is-loading'); button.querySelector('span').textContent = 'Share my AI pulse'; }
  });
  document.querySelector('#submitAnother').addEventListener('click', () => { form.reset(); userName.setCustomValidity(''); userEmail.setCustomValidity(''); otherTools.setCustomValidity(''); paidAmount.setCustomValidity(''); useCases.setCustomValidity(''); count.textContent = '0'; toolsError.textContent = ''; modal.hidden = true; syncExtras(); updateSlider(); });
})();
