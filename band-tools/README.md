# Xiaomi Band 11 BLE Tool v0.1

Windows-only helper for inspecting a Xiaomi Band 11 that belongs to the user.

## Run locally

1. Install Python 3.10+.
2. Open PowerShell in this folder.
3. Run:

    py -m pip install -r requirements.txt
    py band11_ble_scanner.py

The tool scans for nearby BLE devices, selects the first device whose advertised name/address looks like a Xiaomi Band, then attempts a normal GATT connection and records service/characteristic metadata.

Output:
- band11_scan_result.json

## Important

This tool does not bypass pairing, authentication, encryption, or access controls. It does not extract or reveal AuthKey material. It is intended for diagnostics on the user's own wearable.
