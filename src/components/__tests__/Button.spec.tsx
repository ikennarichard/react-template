import { fireEvent, render } from '@testing-library/react-native';
import Button from '../AppButton';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Click Me" />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={onPress} />);
    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalled();
  });
});
