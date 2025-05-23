import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectenPage from '../../app/projecten/page';
import '@testing-library/jest-dom';
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider } from '../../components/organisms/sidebar';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/projecten',
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

describe('ProjectenPage', () => {
  const mockSession = {
    user: { name: 'Test User', email: 'test@example.com', username: 'testuser' },
    expires: '2099-01-01T00:00:00.000Z',
  };
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <SessionProvider session={mockSession}>
        <SidebarProvider>{ui}</SidebarProvider>
      </SessionProvider>
    );

  it('renders the page title', () => {
    renderWithProviders(<ProjectenPage />);
    expect(screen.getByText('Projecten Overzicht')).toBeInTheDocument();
  });

  it('opens the dialog when clicking "Nieuwe Aanvraag"', () => {
    renderWithProviders(<ProjectenPage />);
    fireEvent.click(screen.getByText('Nieuwe Aanvraag'));
    expect(screen.getByText('Nieuwe Project Aanvraag')).toBeInTheDocument();
  });

  it('shows error toast if project name is empty', async () => {
    const { toast } = require('sonner');
    renderWithProviders(<ProjectenPage />);
    fireEvent.click(screen.getByText('Nieuwe Aanvraag'));
    fireEvent.click(screen.getByText('Aanmaken'));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Geef een naam op voor het project');
    });
  });

  it('shows success toast and resets input after creating project', async () => {
    const { toast } = require('sonner');
    renderWithProviders(<ProjectenPage />);
    fireEvent.click(screen.getByText('Nieuwe Aanvraag'));
    fireEvent.change(screen.getByPlaceholderText('Voer een projectnaam in'), { target: { value: 'Test Project' } });
    fireEvent.click(screen.getByText('Aanmaken'));
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Project aangemaakt');
    });
    expect(screen.queryByDisplayValue('Test Project')).not.toBeInTheDocument();
  });
});
