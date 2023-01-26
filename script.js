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
  });

  const exampleProducts = tns({
    container: '.example_products-wrap.active .example_products-slider',
    items: 5,
    gutter: 12,
    slideBy: 1,
    controlsContainer: '.example_products-wrap.active .example_products-controls',
    nav: false,
    responsive: {
      1200: {
        items: 6
      }
    }
  });

  const exampleTabs = document.querySelectorAll('.example_tabs .tab');
  const exampleWraps = document.querySelectorAll('.example_tabs .example_products-wrap');
  exampleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if(!tab.classList.contains('active')) {
        exampleTabs.forEach((tabOld) => {
          tabOld.classList.remove('active');
        });
        tab.classList.add('active');
        exampleWraps.forEach((wrap) => {
          if(wrap.dataset.id === tab.dataset.tab) {
            wrap.classList.add('active');
          } else {
            wrap.classList.remove('active');
          }          
        });
        exampleProducts.rebuild();
      }
    });    
  });

  const multiselectProducts = tns({
    container: '.multiselect_carousel.active .multiselect_carousel-slider',
    items: 3,
    gutter: 12,
    slideBy: 1,
    controlsContainer: '.multiselect_carousel.active .multiselect_carousel-controls',
    nav: false,
    responsive: {
      1200: {
        items: 4
      },
      1367: {
        items: 5
      }
    }
  });

  const multiselectTabs = document.querySelectorAll('.multiselect_tabs .tab');
  const multiselectWraps = document.querySelectorAll('.multiselect_tabs .multiselect_carousel');
  multiselectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if(!tab.classList.contains('active')) {
        multiselectTabs.forEach((tabOld) => {
          tabOld.classList.remove('active');
        });
        tab.classList.add('active');
        multiselectWraps.forEach((wrap) => {
          if(wrap.dataset.id === tab.dataset.tab) {
            wrap.classList.add('active');
          } else {
            wrap.classList.remove('active');
          }          
        });
        multiselectProducts.rebuild();       
      }
    });    
  });
});