document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }

    const changeDevourBtns = document.querySelectorAll('.change-devour');
  
    if (changeDevourBtns) {
      changeDevourBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          const newDevour = e.target.getAttribute('data-newdevour');
  
          const newDevourState = {
            devoured: newDevour,
          };
  
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            body: JSON.stringify(newDevourState),
          }).then((response) => {
            if (response.ok) {
              console.log(`changed devour to: ${newDevour}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    const createBurgerBtn = document.getElementById('create-form');
  
    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        

        const newBurger = {
          burger_name: document.getElementById('ca').value.trim(),
          devoured: document.getElementById('devoured').checked,
        };
  
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          body: JSON.stringify(newBurger),
        }).then(() => {
          document.getElementById('ca').value = '';

          console.log('Created a new burger!');
          location.reload();
        });
      });
    }
  
    const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

    deleteBurgerBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
  
        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
        }).then((res) => {
          console.log(res);
          console.log(`Deleted burger: ${id}`);
  
           location.reload();
        });
      });
    });
  });
  