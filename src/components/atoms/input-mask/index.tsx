import IMask from "imask";
import { useEffect, useRef } from "react";

interface CreditCardInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  error: boolean;
  helperText?: string;
  whiteVariant?: boolean;
}

const CreditCardInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  whiteVariant,
  helperText,
}: CreditCardInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: "0000 0000 0000 0000",
        blocks: {
          0: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 9,
          },
          " ": {
            mask: " ",
            lazy: false,
          },
        },
        prepare: (value: string) => value.replace(/\D/g, ""),
      });

      return () => {
        mask.destroy();
      };
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        placeholder={placeholder || "1234 1234 1234 1234"}
        style={{
          width: "95%",
          height: "35px",
          padding: "8px",
          margin: "10px 0",
          background: "transparent",
          color: whiteVariant ? "#D9D9D9" : "#0E1D40",
          borderRadius: "4px",
          border: whiteVariant ? "1px solid #D9D9D9" : "1px solid #0E1D40",
          letterSpacing: "2px",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
        }}
      />
      {helperText && error && <p style={{ color: "red" }}>{helperText}</p>}
    </div>
  );
};

export default CreditCardInput;
