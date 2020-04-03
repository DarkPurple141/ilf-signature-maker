const generateTemplate = ({
  additional = '',
  name = 'First Name',
  job = 'Job Description',
  phone = '02 9280 0644',
  email = 'your_name@ilf.org.au',
  includeAwards = true,
  includeBanner = true,
  includePrograms = false,
} = {}) =>
  `\
<div class="signature-section">
  <p>${name}</p>
  <p>${job}</p>
</div>
<div class="signature-section">
  <b>Indigenous Literacy Foundation</b>
  <p>PO Box 663 Broadway NSW 2007</p>
  <p>(ph) ${phone} (e) <a href="mailto:${email}">${email}</a></p>
  <p><a href="https://www.ilf.org.au">www.ilf.org.au</a></p>
</div>
<p class="acknowledge">I acknowledge and respect the Traditional Owners and Custodians of the countries on which I work.</p>
${additional && `
<div class="signature-section"><b>${additional}</b>
</div>
`}
${includeAwards || includeBanner || includePrograms ? `\
<div class="signature-section">
${includeAwards ? `\
  <a href="https://go.ilf.org.au/emailsignature">
    <img alt="ILF Awards" src="https://go.ilf.org.au/emailawardsimage" />
  </a>` : ''}
${includeBanner ? `\
  <a href="https://go.ilf.org.au/emailawards">
    <img alt="Promotional Banner Image" src="https://go.ilf.org.au/emailsignatureimage" />
  </a>` : ''}
${includePrograms ? `\
  <a href="https://go.ilf.org.au/programssignaturelink">
    <img alt="ILF Programs" src="https://go.ilf.org.au/programssignatureimage" />
  </a>` : ''}
</div>`
: ''}
`;

function init() {
  const $embed = document.getElementById('embed');
  const $preview = document.getElementById('preview');
  const $job = document.querySelector('input[name=job]');
  const $name = document.querySelector('input[name=name]');
  const $email = document.querySelector('input[name=email]');
  const $phone = document.querySelector('input[name=phone]');
  const $additional = document.querySelector('input[name=additional]');
  const $awards = document.getElementById('awards');
  const $banner = document.getElementById('banner');
  const $programs = document.getElementById('programs');
  const $content = document.getElementById('content');

  let toggled = false;

  const inputs = [$job, $name, $email, $phone, $awards, $additional, $banner, $programs];

  inputs.forEach(input => {
    input.addEventListener('input', rerender);
  });

  const $button = document.getElementById('copy');
  const $view = document.getElementById('view');

  $button.addEventListener('click', copyToClip);
  $view.addEventListener('click', viewSource);

  function viewSource() {
    const template = getTemplate();
    toggled = !toggled;

    if (toggled) {
      const $pre = document.createElement('pre');
      $pre.innerText = getEmbedHTML();
      $preview.innerHTML = "";
      $preview.appendChild($pre);
    } else {
      $preview.innerHTML = template;
    }
  }

  function getEmbedHTML() {
    return `<div>${$embed.innerHTML}</div>`;
  }

  function copyToClip() {
    const html = getEmbedHTML();
    const ta = document.createElement('textarea');
    ta.value = html;
    ta.readOnly = true;
    ta.contentEditable = true;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  function getTemplate() {
    const { value: name } = $name;
    const { value: email } = $email;
    const { value: job } = $job;
    const { value: phone } = $phone;
    const { value: additional } = $additional;

    const { checked: includeAwards } = $awards;
    const { checked: includeBanner } = $banner;
    const { checked: includePrograms } = $programs;

    return generateTemplate({ name, email, job, phone, additional, includeAwards, includeBanner, includePrograms });
  }

  function rerender() {
    const template = getTemplate();

    toggled = false;

    $preview.innerHTML = template;
    $content.innerHTML = template;
  }

  // initial paint
  rerender();
}

document.addEventListener('DOMContentLoaded', init);
