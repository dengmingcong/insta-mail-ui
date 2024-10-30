import { SvgIcon } from "@mui/material";

export default function Logo() {
    return (
        <SvgIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_446_37" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <circle cx="12" cy="12" r="12" fill="#224F6D" />
                </mask>
                <g mask="url(#mask0_446_37)">
                    <circle cx="12" cy="12" r="12" fill="#0D4766" />
                    <rect x="-11" y="3" width="29" height="18" fill="#F9B730" />
                    <circle cx="16.5" cy="14.5" r="2.5" fill="#0D4766" />
                    <path d="M2.96783 11.8539C3.29369 12.0487 3.70631 12.0487 4.03216 11.8539L17.5225 3.79146C18.3835 3.27691 18.0042 2 16.9904 2H-9.99037C-11.0042 2 -11.3835 3.27692 -10.5225 3.79146L2.96783 11.8539Z" fill="#F05625" />
                </g>
            </svg>
        </SvgIcon>
    )
}