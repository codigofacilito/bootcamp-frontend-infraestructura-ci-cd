import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/jobs/Pagination';

describe('Pagination', () => {
  it('renders correct number of page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    const pageButtons = screen.getAllByRole('button').filter(button => 
      /^[0-9]+$/.test(button.textContent || '')
    );
    expect(pageButtons).toHaveLength(5);
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    const prevButton = screen.getByLabelText('Previous Page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    const nextButton = screen.getByLabelText('Next Page');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with correct page number when clicking a page button', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    
    const pageButton = screen.getByText('3');
    await userEvent.click(pageButton);
    
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('shows ellipsis when there are many pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />);
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });
});