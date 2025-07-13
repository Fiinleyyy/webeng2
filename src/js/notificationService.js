/**
 * Notification Service
 * Handles all notification-related functionality for the PWA
 */

class NotificationService {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  /**
   * Request notification permission from the user
   * @returns {Promise<string>} Permission status: 'granted', 'denied', or 'default'
   */
  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Notifications are not supported in this browser');
      return 'denied';
    }

    if (this.permission === 'granted') {
      return 'granted';
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Send an immediate notification
   * @param {string} title - Notification title
   * @param {Object} options - Notification options
   */
  sendNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.warn('Cannot send notification: Permission not granted or not supported');
      return null;
    }

    const defaultOptions = {
      icon: '/icons/192x192.png',
      badge: '/icons/128x128.png',
      ...options
    };

    return new Notification(title, defaultOptions);
  }

  /**
   * Send a welcome notification
   */
  sendWelcomeNotification() {
    return this.sendNotification('Welcome Back', {
      body: 'We missed you! Check out the latest updates.',
      icon: '/icons/192x192.png',
      badge: '/icons/128x128.png'
    });
  }

  /**
   * Send a daily trip reminder notification
   */
  sendTripReminderNotification() {
    return this.sendNotification('Already planned your trip for today?', {
      body: 'Don\'t forget to plan your journey!',
      icon: '/icons/192x192.png',
      badge: '/icons/128x128.png'
    });
  }

  /**
   * Schedule daily notifications at a specific time
   * @param {number} hour - Hour (0-23)
   * @param {number} minute - Minute (0-59)
   */
  scheduleDailyNotification(hour = 14, minute = 49) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.warn('Cannot schedule notifications: Permission not granted or not supported');
      return;
    }

    const getNextTriggerTime = () => {
      const now = new Date();
      const next = new Date();
      next.setHours(hour, minute, 7, 0);
      
      // If the time has already passed today, schedule for tomorrow
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }
      
      return next - now;
    };

    const scheduleNext = () => {
      this.sendTripReminderNotification();
      // Schedule the next notification (24 hours later)
      setTimeout(scheduleNext, 24 * 60 * 60 * 1000);
    };

    // Schedule the first notification
    const timeUntilNext = getNextTriggerTime();
    console.log(`Next daily notification scheduled in ${Math.round(timeUntilNext / 1000 / 60)} minutes`);
    
    setTimeout(scheduleNext, timeUntilNext);
  }

  /**
   * Initialize the notification service
   * Requests permission and sets up daily notifications
   */
  async init() {
    if (!this.isSupported) {
      console.warn('Notifications not supported');
      return false;
    }

    // Request permission if needed
    if (this.permission === 'default') {
      await this.requestPermission();
    }

    // Set up daily notifications if permission is granted
    if (this.permission === 'granted') {
      this.scheduleDailyNotification();
      return true;
    }

    return false;
  }

  /**
   * Check if notifications are enabled
   * @returns {boolean}
   */
  isEnabled() {
    return this.isSupported && this.permission === 'granted';
  }
}

// Export a singleton instance
export default new NotificationService();
