window.onload = () => {
  setTimeout(fetchDataset, 1000);
};

const fetchDataset = () => {
  fetch(`${window.location.href}dataset.json`)
    .then((response) => response.json())
    .then(showContent)
    .catch(showError);
};

const notReactDOM = {
  render(h, e) {
    e.innerHTML = h;
  }
};

const showContent = ({ general_information, lessons }) => {
  document.getElementById('loading').classList.add('hide');

  showProgress(general_information, lessons.length);
  showLessons(lessons);
};

const showError = (error) => {
  console.error('Todo mal', error);

  document.getElementById('error').classList.remove('hide');
};

const showLessons = (lessons) => {
  notReactDOM.render(
    lessons
      .map((lesson) => {
        const { name, date, description, summary, multimedia, resources } = lesson;

        return `<div class="lesson fade-in">
          <div>
            <h4>${name} - ${date}</h4>
          </div>
          <div>
            <p>
              <em>${description}</em>
            </p>
            <a
              href="${summary}"
              target="_blank"
              class="color-animation link"
            >Resumen</a>
            ${
              multimedia
                ? `<a href="${multimedia}"
              target="_blank"
              class="color-animation media"
              >Fotos y Videos</a>`
                : ''
            }
            ${
              resources
                ? `<a href="${resources}"
              target="_blank"
              class="color-animation download"
              >Recursos usados en clase</a>`
                : ''
            }
          </div>
        </div>`;
      })
      .join(''),
    document.getElementById('lessons')
  );
};

const showProgress = (general_information, lessonsLength) => {
  const lessons_amount = general_information[0].lessons_amount;
  const percentage = Number((lessonsLength * 100) / lessons_amount).toFixed(2);
  const percentageAsString = percentage.toString().replace('.', ',');

  notReactDOM.render(
    `<div class="progress-section fade-in">
      <h4>
        Progreso del curso:
        <span class="color-animation">${percentageAsString}%</span>, ${lessonsLength} clases de ${lessons_amount}
      </h4>
      <div class="progress-bar-container">
        <div class="girl" style="left: ${percentage}%;">
          🏃
        </div>
        <div class="medal">🎖</div>
        <div class="background-animation progress-bar" style="width: ${percentage}%;" />
      </div>
    </div>`,
    document.getElementById('progress')
  );
};
