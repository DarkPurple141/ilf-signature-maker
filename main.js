const generateTemplate = ({
  name = 'First Name',
  job = 'Job Description',
  phone = '02 9280 0644',
  email = 'peter@ilf.org.au',
  includeAwards = true,
  includeBanner = true,
} = {}) =>
  `
<div class="signature-section">
  <p>${name}</p>
  <p>${job}</p>
</div>

<div class="signature-section">
  <b>Indigenous Literacy Foundation</b>
  <p>PO Box 663 Broadway NSW 2007</p>
  <p>(ph) ${phone} (e) <a href="mailto:${email}">${email}</a></p>
  <p><a href="www.ilf.org.au">www.ilf.org.au</a></p>
</div>
<p class="acknowledge">I acknowledge and respect the Traditional Owners and Custodians of the countries on which I work.</p>
${includeAwards || includeBanner ? `
  <div class="signature-section">
    ${includeAwards ? '<a href="https://go.ilf.org.au/emailsignature"><img alt="ILF Awards" src="https://go.ilf.org.au/emailawardsimage" /></a>' : ''}
    ${includeBanner ? '<a href="https://go.ilf.org.au/emailawards"><img alt="Promo" src="https://go.ilf.org.au/emailsignatureimage" /></a>' : ''}
  </div>`
: ''}
`;

function init() {
  const $preview = document.getElementById('preview');
  const $job = document.querySelector('input[name=job]');
  const $name = document.querySelector('input[name=name]');
  const $email = document.querySelector('input[name=email]');
  const $phone = document.querySelector('input[name=phone]');
  const $awards = document.getElementById('awards');
  const $banner = document.getElementById('banner');
  const $content = document.getElementById('content');

  let toggled = false;

  const inputs = [$job, $name, $email, $phone, $awards, $banner];

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
      $preview.innerText = template;
    } else {
      $preview.innerHTML = template;
    }
  }

  function copyToClip() {
    const html = document.getElementById('embed').innerHTML;
    navigator.permissions.query({name: 'clipboard-write'}).then(result => {
      if (result.state == 'granted' || result.state == 'prompt') {
        navigator.clipboard.writeText(html);
      }
    }).catch(e => {
      navigator.clipboard.writeText(html);
    });
  }

  function getTemplate() {
    const { value: name } = $name;
    const { value: email } = $email;
    const { value: job } = $job;
    const { value: phone } = $phone;

    const { checked: includeAwards } = $awards;
    const { checked: includeBanner } = $banner;

    return generateTemplate({ name, email, job, phone, includeAwards, includeBanner });
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
