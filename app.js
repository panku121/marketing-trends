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
  const nameEmoji = document.querySelector('#nameEmoji');
  const maleNames = new Set('aarav,abdul,abhishek,adam,aditya,adnan,ahmed,ahmad,ajay,ajith,akash,akshay,alan,albert,alexander,ali,alok,aman,amar,amir,amit,amitabh,andrew,anil,anirudh,anuj,anup,anthony,aravind,arjun,arman,armaan,arnav,arthur,arun,arvind,aryan,ashish,ashok,atharv,atharva,atul,austin,ayush,ayaan,ben,benjamin,bharat,bhavesh,bilal,bill,bobby,brandon,brian,bruce,carl,carter,charles,chetan,chirag,christian,christopher,connor,dan,daniel,darshan,dave,david,deepak,dev,devesh,dhruv,dilip,diljit,dinesh,donald,douglas,edward,elijah,eric,ethan,faisal,farhan,frank,gabriel,gagan,gaurav,gautam,george,gerald,girish,gopal,gregory,hamza,hardik,harold,harsh,harshit,harry,hassan,hemant,henry,hitesh,hrithik,hunter,husain,hussain,ibrahim,imran,irfan,isaac,ishan,ishaan,jack,jacob,james,jason,jatin,jay,jeffrey,jeremy,jerry,jeet,jim,joe,john,johnny,jonathan,jose,joseph,joshua,juan,junaid,justin,kabir,kailash,kapil,karan,karthik,kartik,kaushik,keith,kenneth,keshav,kevin,kishan,krish,kunal,kyle,lalit,lawrence,leo,logan,lokesh,lucas,luke,mahesh,manish,manoj,mark,martin,mason,matt,matthew,max,mayank,michael,mike,milind,mohan,mohammed,mohammad,mohit,mukesh,naman,naresh,nasir,nathan,naveen,neeraj,nicholas,nick,nikhil,nishant,nitin,noah,oliver,omar,om,omkar,oscar,owen,pankaj,parth,patrick,paul,peter,philip,piyush,pradeep,prakash,pranav,prashant,prateek,puneet,raghav,rahul,raj,rajan,rajat,rajendra,rajesh,rajiv,rajeev,rakesh,ram,raman,ramesh,ranbir,ranveer,ravi,raymond,rehan,reyansh,richard,rishabh,ritik,ritesh,robert,rohan,rohit,ronald,ronit,roy,ryan,sachin,sagar,sahil,salman,sameer,samir,samuel,sandeep,sanjay,sanjeev,sarthak,saurabh,scott,sebastian,shahid,shaurya,shiv,shivam,shreyas,shubham,siddhant,siddharth,sohan,sourav,steve,stephen,steven,sumit,sunil,suresh,surya,tariq,tarun,tejas,thomas,tim,timothy,tom,tushar,tyler,uday,umesh,usman,utkarsh,vaibhav,varun,vedant,vihaan,vijay,vikas,vikram,vikrant,vinay,vincent,vineet,vipin,virat,vishal,vivek,walter,wasim,wayne,william,yash,yogesh,yusuf,yousuf,yuvraj,zachary,zaid,zain,zakir,zayan'.split(','));
  const femaleNames = new Set('aaliyah,aarti,aarohi,aashi,abigail,aditi,advika,aisha,aishwarya,aiza,aleena,alice,alia,alisha,allison,amanda,amber,amelia,amira,amrita,amy,anamika,ananya,anaya,andrea,angela,anita,anjali,anna,anuradha,anushka,anuja,anvi,aparna,apoorva,archana,arpita,arti,asha,ashley,avni,ayesha,babita,barbara,bella,betty,beverly,bhagya,bhagyashri,bhagyasri,bhavana,bhavika,bhavna,bhumi,bhumika,brenda,brittany,carol,caroline,catherine,chhaya,chloe,chitra,christina,christine,claire,cynthia,damini,danielle,deborah,deepa,deepika,deepti,devika,diana,diane,diksha,diya,divya,donna,dorothy,ekta,elena,elizabeth,ella,ellie,emily,emma,esha,eva,evelyn,falguni,farah,farzana,fatima,frances,gabriella,garima,gauri,gayatri,geeta,gita,gloria,grace,gunjan,hania,hannah,hansika,harper,heather,heena,helen,hema,hina,himani,inaaya,indira,iqra,iram,isabella,isha,ishita,isla,jacqueline,jahnvi,janet,janice,jasmine,jasmin,jaya,jennifer,jessica,jhanvi,joan,joyce,juhi,julia,julie,jyoti,jyotsna,kajal,kalpana,kamini,kanchan,kanika,karen,kareena,karishma,kashish,kasis,kate,katherine,kathleen,katie,kavita,kavya,kayla,kelly,keya,khushi,khushboo,kiara,kirti,komal,kriti,kritika,lakshmi,lata,laura,lauren,laxmi,leah,lily,linda,lisa,lucy,luna,madhu,madhuri,mahira,mahi,mamta,manisha,mansi,maria,marie,mary,maryam,maya,mayuri,meena,meenakshi,megha,melissa,mia,michelle,misha,monica,monika,muskan,myra,naina,nalini,namita,namrata,nancy,natalie,navya,nazia,neelam,neetu,neha,nicole,nidhi,nikita,nilam,nisha,nora,nupur,olivia,padma,palak,pallavi,pamela,pari,parineeti,parul,patricia,payal,pooja,poonam,prachi,pratibha,prerna,preeti,priti,priya,priyanka,puja,rachel,racheyata,rachna,radha,rani,rashmi,rebecca,rekha,renu,richa,ridhima,ritika,ritu,riya,rose,roshni,rubina,ruchi,ruchika,ruth,sadhana,sahiba,sajal,sakshi,saloni,samantha,samiksha,sana,sandhya,sandra,sania,sapna,sara,sarah,sarika,sarita,savita,scarlett,seema,shabana,shabnam,shalini,sharon,shazia,sheetal,shikha,shilpa,shivani,shreya,shraddha,shruti,shweta,simran,sita,siya,smita,smriti,sneha,snehal,sofia,sonal,sonali,sonam,sonia,sophia,sophie,stella,stephanie,sudha,sujata,sukanya,sunaina,sunidhi,sunita,supriya,surbhi,susan,sushma,sushmita,swati,sweta,tamanna,tanya,tara,tejal,teresa,trisha,tripti,tulsi,uma,urvashi,usha,vaishali,vaishnavi,vandana,varsha,vartika,victoria,vidya,vinita,violet,yamini,yasmin,yogita,zainab,zara,zoe,zoya'.split(','));
  const surnames = new Set('agarwal,aggarwal,ansari,banerjee,bansal,bhatt,bose,chakraborty,chatterjee,chopra,choudhary,choudhury,chowdhury,das,deshmukh,deshpande,dhoni,dubey,dutt,dutta,dwivedi,ghosh,goyal,gupta,iyengar,iyer,jadhav,jain,joshi,kapoor,kapur,kaur,khan,khanna,kohli,kulkarni,kumar,malhotra,mehta,menon,mishra,mittal,mukherjee,nair,naidu,nanda,pandey,patel,pathak,patil,pawar,pillai,qureshi,rao,reddy,roy,saxena,sen,shah,shaikh,sharma,shetty,sheikh,shukla,siddiqui,singh,srivastava,thakur,tiwari,trivedi,verma,yadav'.split(','));
  const givenNames = new Set([...maleNames, ...femaleNames]);
  const count = document.querySelector('#characterCount');
  const progressBar = document.querySelector('#progressBar');
  const progressText = document.querySelector('#progressText');
  const toolsError = document.querySelector('#toolsError');
  const emailError = document.querySelector('#emailError');
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
  const emailProblem = (email, requireValue) => {
    if (!email) return requireValue ? 'Please enter your work email.' : '';
    return emailPattern.test(email) ? '' : 'Please enter a valid email address.';
  };
  const showEmailError = (message) => {
    emailError.textContent = message;
    userEmail.classList.toggle('is-invalid', Boolean(message));
    userEmail.setCustomValidity('');
  };
  const guessNameEmoji = (value) => {
    const parts = value.trim().toLowerCase().replace(/[^a-z\s-]/g, '').split(/[\s-]+/).filter((part) => part && !['mr', 'mrs', 'ms', 'miss', 'dr', 'prof'].includes(part));
    const token = parts.length > 1 && surnames.has(parts[0]) && givenNames.has(parts[1]) ? parts[1] : parts[0];
    if (!token) return '';
    if (maleNames.has(token)) return '👨';
    if (femaleNames.has(token)) return '👩';
    return '';
  };
  const showNameEmoji = () => {
    const emoji = guessNameEmoji(userName.value);
    nameEmoji.textContent = emoji;
    nameEmoji.hidden = !emoji;
    userName.classList.toggle('has-emoji', Boolean(emoji));
  };
  slider.addEventListener('input', updateSlider);
  userName.addEventListener('input', () => { userName.setCustomValidity(''); showNameEmoji(); updateProgress(); });
  userEmail.addEventListener('input', () => {
    const email = userEmail.value.trim();
    if (emailError.textContent || emailPattern.test(email)) showEmailError(emailProblem(email, false));
    updateProgress();
  });
  userEmail.addEventListener('blur', () => showEmailError(emailProblem(userEmail.value.trim(), false)));
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
    const amountIsDecimal = /^\d+(\.\d+)?$/.test(amount);
    let valid = true;
    if (!name) { userName.setCustomValidity('Please enter your name.'); valid = false; } else userName.setCustomValidity('');
    const emailIssue = emailProblem(email, true);
    showEmailError(emailIssue);
    if (emailIssue) valid = false;
    if (!tools.length) { toolsError.textContent = 'Please select at least one tool.'; valid = false; }
    if (otherToolOption.checked && !otherName) { otherTools.setCustomValidity('Please name the other tool.'); valid = false; } else otherTools.setCustomValidity('');
    if (paid && (!amountIsDecimal || Number(amount) > 99999999)) { paidAmount.setCustomValidity('Please enter the amount you pay.'); valid = false; } else paidAmount.setCustomValidity('');
    if (!purpose) { useCases.setCustomValidity('Please tell us how you use these tools.'); valid = false; } else useCases.setCustomValidity('');
    if (!valid) { form.reportValidity(); if (emailIssue && name) userEmail.focus(); return; }
    const payload = { submittedAt: new Date().toISOString(), userName: name, userEmail: email, aiUsagePercent: Number(slider.value), tools, otherTools: otherName, planType: planType.value, paidAmount: paid ? amount : '', currency: paid ? currency.value : '', useCases: purpose };
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
  document.querySelector('#submitAnother').addEventListener('click', () => { form.reset(); userName.setCustomValidity(''); showNameEmoji(); showEmailError(''); otherTools.setCustomValidity(''); paidAmount.setCustomValidity(''); useCases.setCustomValidity(''); count.textContent = '0'; toolsError.textContent = ''; modal.hidden = true; syncExtras(); updateSlider(); });
})();
