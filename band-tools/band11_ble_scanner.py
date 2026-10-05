import asyncio
import json
from datetime import datetime
from pathlib import Path

from bleak import BleakClient, BleakScanner

OUTPUT = Path(__file__).resolve().parent / "band11_scan_result.json"
TARGET_WORDS = ("xiaomi", "mi band", "band 11", "m2315")

async def scan():
    print("Scanning for BLE devices for 10 seconds...")
    devices = await BleakScanner.discover(timeout=10.0, return_adv=True)
    matches = []
    for device, adv in devices.values():
        name = (device.name or adv.local_name or "").strip()
        blob = f"{name} {device.address}".lower()
        if any(word in blob for word in TARGET_WORDS):
            matches.append({"name": name, "address": device.address, "rssi": getattr(adv, "rssi", None)})

    print(f"Found {len(matches)} possible Xiaomi/Band device(s).")
    for i, item in enumerate(matches, 1):
        print(f"[{i}] {item['name'] or '(no name)'} | {item['address']} | RSSI {item['rssi']}")

    result = {"timestamp_utc": datetime.utcnow().isoformat() + "Z", "matches": matches, "gatt": []}

    if matches:
        selected = matches[0]
        print(f"\nTrying GATT connection to: {selected['name'] or selected['address']}")
        try:
            async with BleakClient(selected["address"], timeout=15.0) as client:
                print(f"Connected: {client.is_connected}")
                for service in client.services:
                    item = {"uuid": str(service.uuid), "description": getattr(service, "description", ""), "characteristics": []}
                    for char in service.characteristics:
                        item["characteristics"].append({
                            "uuid": str(char.uuid),
                            "description": getattr(char, "description", ""),
                            "properties": list(char.properties),
                        })
                    result["gatt"].append(item)
                print(f"Discovered {len(result['gatt'])} GATT service(s).")
        except Exception as exc:
            result["gatt_error"] = f"{type(exc).__name__}: {exc}"
            print(f"GATT connection/discovery failed: {result['gatt_error']}")

    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nSaved result to: {OUTPUT}")

if __name__ == "__main__":
    asyncio.run(scan())
