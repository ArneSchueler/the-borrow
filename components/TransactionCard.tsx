"use client";

import { EnrichedTransaction } from "@/lib/data";
import { format } from "date-fns";
import { User, CalendarDays, Euro, Package, Clock } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import {
  markTransactionAsReturned,
  confirmTransactionReturn,
  requestTransactionExtension,
  acceptTransactionExtension,
  declineTransactionExtension,
  remindTransactionParty,
} from "@/app/[locale]/actions/transaction";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNotifications } from "@/components/NotificationProvider";

export function MobileTransactionCard({ t }: { t: EnrichedTransaction }) {
  const isCompleted = t.status === "COMPLETED";
  const isOverdue =
    t.expectedReturnDate && t.expectedReturnDate < new Date() && !isCompleted;
  const tCard = useTranslations("TransactionCard");
  const tBtn = useTranslations("Buttons");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isExtensionDialogOpen, setIsExtensionDialogOpen] = useState(false);
  const [extensionDate, setExtensionDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addNotification } = useNotifications();
  const isFullyConfirmed = t.creatorConfirmed && t.partnerConfirmed;

  const handleReturn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await markTransactionAsReturned(t.id);
      addNotification(
        "returned",
        `Status updated to Pending Return for ${t.itemName || "item"}.`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReturnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmDialog(true);
  };

  const handleConfirmReturn = async () => {
    setIsLoading(true);
    try {
      await confirmTransactionReturn(t.id);
      addNotification(
        "confirmed",
        `Transaction successfully marked as completed for ${t.itemName || "item"}.`,
      );
      setShowConfirmDialog(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemind = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await remindTransactionParty(t.id);
      addNotification(
        "reminder",
        `Reminder sent to the other party for ${t.itemName || "item"}!`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestExtensionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExtensionDialogOpen(true);
  };

  const submitExtensionRequest = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!extensionDate) return;
    setIsLoading(true);
    try {
      await requestTransactionExtension(t.id, new Date(extensionDate));
      setIsExtensionDialogOpen(false);
      addNotification(
        "reminder",
        `Extension requested to ${format(new Date(extensionDate), "dd.MM.yyyy")}.`,
      );
      setExtensionDate("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptExtension = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      await acceptTransactionExtension(t.id);
      addNotification(
        "confirmed",
        `Extension accepted for ${t.itemName || "item"}.`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineExtension = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      await declineTransactionExtension(t.id);
      addNotification(
        "reminder",
        `Extension declined for ${t.itemName || "item"}.`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl border p-4 transition-all duration-300 ${
        isCompleted
          ? "border-[#e3e2e1] bg-[#faf9f8] opacity-60"
          : "border-[#d8dcdf] bg-white hover:-translate-y-[2px] hover:border-[#134e5e] hover:shadow-md"
      }`}
    >
      <Link href={`/transaction/${t.id}`} className="group block flex-1">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-title-md text-title-md text-primary group-hover:underline">
            {t.amount ? `${t.amount} €` : t.itemName || tCard("itemFallback")}
          </p>
          {isOverdue ? (
            <span className="rounded-full bg-[#ffdad6] px-3 py-1 text-xs font-semibold text-[#d0262d]">
              {tCard("overdue")}
            </span>
          ) : (
            <div className="bg-primary-container text-on-primary-container flex items-center justify-center rounded-full px-3 py-1 font-label-sm text-label-sm">
              {t.type === "MONEY" ? (
                <Euro className="h-4 w-4" />
              ) : (
                <Package className="h-4 w-4" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[#40484b]">
          <User className="h-4 w-4 shrink-0" />
          <p className="font-body-md truncate">{t.partyName}</p>
        </div>
        <div
          className={`mt-1 flex items-center gap-1.5 ${isOverdue ? "text-[#d0262d]" : "text-[#40484b]"}`}
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          {t.expectedReturnDate ? (
            <p className="font-body-md">
              {isOverdue
                ? tCard("overdue")
                : tCard("due", {
                    date: format(t.expectedReturnDate, "dd.MM.yyyy"),
                  })}
            </p>
          ) : (
            <p className="font-body-md">{tCard("noDate")}</p>
          )}
        </div>

        {!isFullyConfirmed && (
          <div className="mt-2 flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md inline-flex w-fit">
            <Clock className="h-3 w-3" />
            <p className="text-xs font-medium">
              {tCard("awaitingConfirmation")}
            </p>
          </div>
        )}
      </Link>

      {isFullyConfirmed && !isCompleted && (
        <div className="mt-4 flex flex-col gap-2">
          {t.requestedExtensionDate ? (
            t.isLentByMe ? (
              <div className="flex flex-col gap-2">
                <div className="rounded bg-amber-50 px-2 py-1.5 text-center text-[12px] font-medium text-amber-700">
                  Extension requested to{" "}
                  {format(new Date(t.requestedExtensionDate), "dd.MM.yyyy")}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAcceptExtension}
                    disabled={isLoading}
                    className="flex-1 rounded-lg bg-amber-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDeclineExtension}
                    disabled={isLoading}
                    className="flex-1 rounded-lg border border-amber-600 py-2 text-center text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 disabled:opacity-50"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ) : (
              <button
                disabled
                className="w-full rounded-lg bg-amber-50 py-2 text-center text-sm font-medium text-amber-600 opacity-80"
              >
                Extension to{" "}
                {format(new Date(t.requestedExtensionDate), "dd.MM.yyyy")}{" "}
                pending
              </button>
            )
          ) : (
            <div className="flex gap-2">
              {t.isLentByMe ? (
                <>
                  <button
                    onClick={handleConfirmReturnClick}
                    disabled={isLoading}
                    className="flex-1 rounded-lg bg-[#0d4f63] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#0a3d4c] disabled:opacity-50"
                  >
                    {tBtn("confirmReturn")}
                  </button>
                  <button
                    onClick={handleRemind}
                    disabled={isLoading}
                    className="flex-1 rounded-lg border border-[#0d4f63] py-2 text-center text-sm font-medium text-[#0d4f63] transition-colors hover:bg-[#f1f4f5] disabled:opacity-50"
                  >
                    {tBtn("remind")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleReturn}
                    disabled={isLoading}
                    className="flex-1 rounded-lg bg-[#0d4f63] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#0a3d4c] disabled:opacity-50"
                  >
                    {t.type === "MONEY" ? tBtn("payNow") : tBtn("returnItem")}
                  </button>
                  <button
                    onClick={handleRequestExtensionClick}
                    disabled={isLoading}
                    className="flex-1 rounded-lg border border-[#0d4f63] py-2 text-center text-sm font-medium text-[#0d4f63] transition-colors hover:bg-[#f1f4f5] disabled:opacity-50"
                  >
                    {tBtn("extend")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {mounted &&
        showConfirmDialog &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-2 text-lg font-bold text-[#003644]">
                Confirm Return
              </h3>
              <p className="mb-6 text-sm text-[#40484b]">
                Has &quot;
                {t.amount ? `${t.amount} €` : t.itemName || "this item"}
                &quot; really been returned?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmDialog(false);
                  }}
                  className="flex-1 rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63] transition-colors hover:bg-[#f1f4f5]"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirmReturn();
                  }}
                  disabled={isLoading}
                  className="flex-1 rounded-lg bg-[#0d4f63] py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a3d4c] disabled:opacity-50"
                >
                  {isLoading ? "Confirming..." : "Yes, Confirmed"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {mounted &&
        isExtensionDialogOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-2 text-lg font-bold text-[#003644]">
                Request Extension
              </h3>
              <p className="mb-4 text-sm text-[#40484b]">
                Select a new return date for &quot;
                {t.amount ? `${t.amount} €` : t.itemName || "this item"}
                &quot;.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#40484b]">
                    New Return Date
                  </label>
                  <input
                    type="date"
                    value={extensionDate}
                    onChange={(e) => setExtensionDate(e.target.value)}
                    className="w-full rounded-lg border border-[#c0c8cb] bg-[#f5f2ed] px-4 py-3 outline-none focus:ring-2 focus:ring-[#306576]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsExtensionDialogOpen(false);
                      setExtensionDate("");
                    }}
                    className="flex-1 rounded-lg border border-[#0d4f63] py-2 text-sm font-medium text-[#0d4f63] transition-colors hover:bg-[#f1f4f5]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitExtensionRequest}
                    disabled={!extensionDate || isLoading}
                    className="flex-1 rounded-lg bg-[#0d4f63] py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a3d4c] disabled:opacity-50"
                  >
                    {isLoading ? "Requesting..." : "Request"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export function DesktopTransactionCard({ t }: { t: EnrichedTransaction }) {
  return <MobileTransactionCard t={t} />;
}
