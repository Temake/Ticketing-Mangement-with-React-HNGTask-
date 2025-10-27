const SESSION_KEY = 'ticketapp_session';
const TICKETS_KEY = 'ticketapp_tickets';
const USER_KEY = 'ticketapp_user';

export const storage = {
  // Session management
  getSession(): string | null {
    return localStorage.getItem(SESSION_KEY);
  },

  setSession(token: string): void {
    localStorage.setItem(SESSION_KEY, token);
  },

  clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // User management
  getUser(): any | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Tickets management
  getTickets(): any[] {
    const tickets = localStorage.getItem(TICKETS_KEY);
    return tickets ? JSON.parse(tickets) : [];
  },

  setTickets(tickets: any[]): void {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  },

  // Add ticket
  addTicket(ticket: any): void {
    const tickets = this.getTickets();
    tickets.push(ticket);
    this.setTickets(tickets);
  },

  // Update ticket
  updateTicket(id: string, updatedTicket: any): void {
    const tickets = this.getTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...updatedTicket, updatedAt: new Date().toISOString() };
      this.setTickets(tickets);
    }
  },

  // Delete ticket
  deleteTicket(id: string): void {
    const tickets = this.getTickets();
    const filtered = tickets.filter(t => t.id !== id);
    this.setTickets(filtered);
  }
};
