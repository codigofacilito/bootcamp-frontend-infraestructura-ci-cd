import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/components/jobs/SearchBar';

describe('SearchBar', () => {
  it('renders with initial query', () => {
    render(<SearchBar initialQuery="developer" onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('developer');
  });

  it('calls onSearch when form is submitted', async () => {
    const onSearch = vi.fn();
    render(<SearchBar initialQuery="" onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'engineer');
    fireEvent.submit(screen.getByRole('search'));

    expect(onSearch).toHaveBeenCalledWith('engineer');
  });

  it('updates input value when typing', async () => {
    render(<SearchBar initialQuery="" onSearch={() => {}} />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'developer');
    expect(input).toHaveValue('developer');
  });

  it('shows focus styles when input is focused', async () => {
    render(<SearchBar initialQuery="" onSearch={() => {}} />);
    const input = screen.getByRole('textbox');
    const searchContainer = screen.getByTestId('search-container');
    
    await userEvent.click(input);
    expect(searchContainer).toHaveClass('border-primary');
  });
});