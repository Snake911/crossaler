document.addEventListener('DOMContentLoaded', () => {
  const Visible = (target) => {
    // Все позиции элемента
    const targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };
    return (targetPosition.bottom > windowPosition.top && 
      targetPosition.top < windowPosition.bottom && 
      targetPosition.right > windowPosition.left && 
      targetPosition.left < windowPosition.right);
  };

  const animateElements = document.querySelectorAll('.animate');
  const animated = (elements) => {
    elements.forEach(element => {
      if(Visible(element)) {
        element.classList.add('animated');
      }
    });
  };

  animated(animateElements);

  window.addEventListener('scroll', () => {
    animated(animateElements);
  });

  const dots = document.querySelectorAll('.many-types_dot');
  const examples = tns({
    container: '.many-types_slider',
    items: 2,
    gutter: 18,
    slideBy: 1,
    loop: false,
    prevButton: '.many-types_control-left',
    nextButton: '.many-types_control-right',
    nav: false
  });

  examples.events.on('transitionEnd', (info) => {
    dots.forEach((dot, index) => {
      dot.classList.remove('active')
      if(index + 1 === info.displayIndex) {
        dot.classList.add('active');
      }      
    });
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { 
      examples.goTo(index);
      dots.forEach((dot) => {
        dot.classList.remove('active')
      });

      dot.classList.add('active');
    });
  })
});