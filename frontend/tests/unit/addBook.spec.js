import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
// import axios from 'axios';
import AddBook from '@/views/store/addBook.vue';

describe('AddBook', () => {

    it('input book data', async () => {
    //   axios.post = jest.fn().mockReturnValue({
    //     status: 201
    //   });
  
      const { getByTestId } = render(AddBook);
  
      const bookName = 'แนวข้อสอบ GAT';
      const bookDescription = 'แนวข้อสอบ GAT ภาษาอังกฤษ';
      const bookType = 'magazine';
      const bookCategory = 'ความรู้';
      const bookPrice = '180';
      const bookCount = '5';
      const bookPicture = '@/assets/book/Book.jpg';

      await fireEvent.update(getByTestId('bookName'), bookName);
      await fireEvent.update(getByTestId('bookDescription'), bookDescription);
      await fireEvent.update(getByTestId('bookType'), bookType);
      await fireEvent.update(getByTestId('bookCategory'), bookCategory);
      await fireEvent.update(getByTestId('bookPrice'), bookPrice);
      await fireEvent.update(getByTestId('bookCount'), bookCount);
      await fireEvent.update(getByTestId('bookPicture'), bookPicture);

    //   await fireEvent.click(getByTestId('submitLogin'));
    //   expect(axios.post).toHaveBeenCalledWith('https://vast-headland-70807.herokuapp.com/store/addbook/1',
    //   {
    //     userbookNamename,
    //     bookDescription,
    //     bookType,
    //     bookCategory,
    //     bookPrice,
    //     bookCount,
    //     bookPicture
    //   });
    });
  });