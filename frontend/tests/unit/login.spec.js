import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from '@/views/account/login.vue'

describe('Login', () => {

  it('input username and password', async () => {
    // axios.post = jest.fn().mockReturnValue({
    //   status: 201
    // });

    const { getByTestId } = render(Login);

    const username = 'owenlnwza';
    const password = '123456aA';
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    await fireEvent.update(usernameInput, username);
    await fireEvent.update(passwordInput, password);
    await fireEvent.click(getByTestId('submitLogin'));
    // expect(axios.post).toHaveBeenCalledWith('https://immense-mesa-76111.herokuapp.com/account/login/',
    // {
    //   username,
    //   password,
    // });
  });
});