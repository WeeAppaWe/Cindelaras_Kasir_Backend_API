// Fonnte WhatsApp API Utility
// Documentation: https://fonnte.com/api

import fonnteConfig from '../config/fonnte.config';
import type { SendMessageParams, SendMessageResponse, FonnteApiResponse } from '../types/fonnte.types';

/**
 * Format phone number to Indonesian format (628xxx)
 * Handles: 08xxx, +628xxx, 628xxx, 8xxx
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');

  // Handle various formats
  if (cleaned.startsWith('0')) {
    // 08xxx → 628xxx
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    // 8xxx → 628xxx
    cleaned = '62' + cleaned;
  }
  // 628xxx stays as is

  return cleaned;
};

/**
 * Send text message via Fonnte (Free tier)
 */
export const sendWhatsAppMessage = async (params: SendMessageParams): Promise<SendMessageResponse> => {
  try {
    const { target, message } = params;
    const formattedPhone = formatPhoneNumber(target);

    const formData = new URLSearchParams();
    formData.append('target', formattedPhone);
    formData.append('message', message);

    const response = await fetch(`${fonnteConfig.baseUrl}${fonnteConfig.endpoints.send}`, {
      method: 'POST',
      headers: {
        'Authorization': fonnteConfig.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json() as FonnteApiResponse;

    return {
      status: result.status === true,
      id: result.id,
      detail: result.detail,
      message: result.reason || result.message,
    };
  } catch (error) {
    console.error('Fonnte send message error:', error);
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Gagal mengirim pesan WhatsApp',
    };
  }
};

/**
 * Check if Fonnte token is configured
 */
export const isFonnteConfigured = (): boolean => {
  return !!fonnteConfig.token && fonnteConfig.token.length > 0;
};

export default {
  sendWhatsAppMessage,
  formatPhoneNumber,
  isFonnteConfigured,
};
