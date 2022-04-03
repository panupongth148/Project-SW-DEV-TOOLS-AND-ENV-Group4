import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
// import axios from 'axios';
import EditBook from '@/views/store/editbook.vue';

describe('EditBook', () => {

    it('edit book data', async () => {
    //   axios.post = jest.fn().mockReturnValue({
    //     status: 201
    //   });
    
      const props = { 
        user: {
            account_id: "k2VC3E2gceI3KXzpCijP",
            address: null,
            email: "owen@gmail.com",
            first_name: "Taweesak",
            image: null,
            last_name: "Junoumpon",
            phone_number: "0952314568",
            type: "seller",
            usernme: "owenlnwza",
        }
      }
  
      const { getByTestId } = render(EditBook, {
        mocks: {
            $route: {params: { bookId: "6iUEUr2HfWmXZKTmTv6h" }},
        },
        propsData: props
      });
  
      const bookName = 'แนวข้อสอบ GAT ภาษาอังกฤษ';
      const bookDescription = 'แนวข้อสอบ GAT ภาษาอังกฤษ จะทำให้นักเรียนเข้าใจถึงลักษณะและเทคนิคพิชิตข้อสอบ ซึ่งจำเป็นอย่างยิ่งในการทำคะแนนให้สูงที่สุดในการสอบเข้าศึกษาต่อระดับมหาวิทยาลัย';
      const bookType = 'book';
      const bookCategory = 'ความรู้ภาษาอังกฤษ';
      const bookPrice = '179';
      const bookCount = '10';

    //   await fireEvent.update(getByTestId('bookName'), bookName);
      await fireEvent.update(getByTestId('bookDescription'), bookDescription);
      await fireEvent.update(getByTestId('bookType'), bookType);
      await fireEvent.update(getByTestId('bookCategory'), bookCategory);
      await fireEvent.update(getByTestId('bookPrice'), bookPrice);
      await fireEvent.update(getByTestId('bookCount'), bookCount);
      
    //   await fireEvent.click(getByTestId('submitLogin'));
    //   expect(axios.post).toHaveBeenCalledWith('https://immense-mesa-76111.herokuapp.com/store/editbook/1',
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