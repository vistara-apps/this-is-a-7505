import { useWalletClient } from "wagmi";
import { useCallback } from "react";
import axios from "axios";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

export function usePaymentContext() {
  const { data: walletClient, isError, isLoading } = useWalletClient();

  const createSession = useCallback(async () => {
    // Check wallet connection status with user-friendly error messages
    if (!walletClient) {
      throw new Error("Please connect your wallet to continue with the payment");
    }
    
    if (!walletClient.account) {
      throw new Error("No account found. Please connect your wallet and try again");
    }
    
    if (isError) {
      throw new Error("There was an issue connecting to your wallet. Please reconnect and try again");
    }
    
    if (isLoading) {
      throw new Error("Wallet is still connecting. Please wait a moment and try again");
    }
    
    try {
      const baseClient = axios.create({
        baseURL: "https://payments.vistara.dev",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000, // 15 second timeout
      });
      
      const apiClient = withPaymentInterceptor(baseClient, walletClient);
      
      const response = await apiClient.post("/api/payment", { 
        amount: "$0.50",
        item: "DNA Trait Prediction",
        description: "GeneGlow DNA analysis service"
      });
      
      const paymentResponse = response.config.headers["X-PAYMENT"];
      if (!paymentResponse) {
        throw new Error("Payment verification failed. Please try again");
      }
      
      const decoded = decodeXPaymentResponse(paymentResponse);
      console.log(`Payment successful: ${JSON.stringify(decoded)}`);
      
      return decoded;
    } catch (error) {
      // Handle specific error types with user-friendly messages
      if (error.code === 'ACTION_REJECTED') {
        throw new Error("Payment was rejected. Please approve the transaction in your wallet");
      }
      
      if (error.response) {
        // Server responded with an error status
        const status = error.response.status;
        if (status === 401 || status === 403) {
          throw new Error("Authentication failed. Please reconnect your wallet");
        } else if (status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again");
        } else if (status >= 500) {
          throw new Error("Payment service is currently unavailable. Please try again later");
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("No response from payment service. Please check your connection and try again");
      }
      
      // Re-throw the original error with more context if none of the above conditions match
      throw error.message ? error : new Error("Payment failed. Please try again");
    }
  }, [walletClient, isError, isLoading]);

  return { createSession };
}
