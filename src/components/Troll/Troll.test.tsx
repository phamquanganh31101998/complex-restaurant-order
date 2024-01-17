import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Troll } from './Troll.tsx';

describe('Troll component', () => {
  afterEach(() => cleanup());

  it('should render introduction text, button correctly', async () => {
    render(<Troll title="hello" />);

    const introductionText = screen.queryByTestId('introduction-text');
    const titleText = screen.queryByTestId('title-text');
    const button = screen.queryByTestId('increase-button');

    expect(introductionText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should render with correct title prop', async () => {
    const title = 'hello';
    render(<Troll title={title} />);

    const titleText = screen.queryByTestId('title-text');
    expect(titleText).toHaveTextContent(`Title: ${title}`);
  });

  it('should render with default title prop', async () => {
    render(<Troll />);

    const titleText = screen.queryByTestId('title-text');
    expect(titleText).toHaveTextContent('Title: default');
  });

  it('should not show Click times number if button is not clicked', async () => {
    render(<Troll />);

    const clickTimesText = screen.queryByTestId('number');
    expect(clickTimesText).not.toBeInTheDocument();
  });

  it('should show Click times with when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Troll />);

    const button = screen.queryByTestId('increase-button');
    expect(button).toBeInTheDocument();

    await user.click(button as HTMLElement);
    const clickTimesText = screen.queryByTestId('number');
    expect(clickTimesText).toBeInTheDocument();
    expect(clickTimesText).toHaveTextContent('Click times: 1');

    await user.click(button as HTMLElement);
    expect(clickTimesText).toHaveTextContent('Click times: 2');
  });
});
