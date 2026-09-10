import os, struct, zlib
from pathlib import Path

base = Path('public/projects')
base.mkdir(parents=True, exist_ok=True)

specs = [
    ('power_bi_executive_overview.png', 'Executive Overview', '#0f172a', '#10c7c1', '#dbeafe'),
    ('power_bi_product_performance.png', 'Product Performance', '#111827', '#a78bfa', '#d1fae5'),
    ('power_bi_regional_analysis.png', 'Regional Analysis', '#172033', '#fbbf24', '#dbeafe'),
    ('power_bi_customer_insights.png', 'Customer Insights', '#1f2937', '#34d399', '#fee2e2'),
]

def hex_to_rgb(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i+2], 16) for i in (0, 2, 4))

def chunk(tag, data):
    return (
        struct.pack('>I', len(data)) +
        tag +
        data +
        struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    )

def png_from_pixels(width, height, pixels):
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        for x in range(width):
            r, g, b, a = pixels[y][x]
            raw.extend((r, g, b, a))
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(bytes(raw), 9)) + chunk(b'IEND', b'')

for filename, title, bg_hex, accent_hex, text_hex in specs:
    width, height = 1200, 800
    bg = hex_to_rgb(bg_hex)
    accent = hex_to_rgb(accent_hex)
    text = hex_to_rgb(text_hex)
    pixels = [[(0, 0, 0, 0) for _ in range(width)] for _ in range(height)]

    for y in range(height):
        for x in range(width):
            pixels[y][x] = bg + (255,)

    # chart frame
    for y in range(80, 720):
        for x in range(80, 1120):
            if 80 <= x <= 1120 and 80 <= y <= 720:
                if x in range(90, 1110) and y in range(90, 710):
                    pass
    for y in range(80, 720):
        for x in range(80, 1120):
            if x in range(80, 1120) and y in range(80, 720):
                if x in [80, 1120] or y in [80, 720]:
                    pixels[y][x] = accent + (255,)

    # inner panel
    for y in range(120, 660):
        for x in range(120, 1080):
            pixels[y][x] = (30, 41, 59, 255)

    # header dots
    for cx in (170, 210, 250):
        for y in range(180, 205):
            for x in range(cx, cx + 18):
                if (x - cx - 9) ** 2 + (y - 192) ** 2 <= 81:
                    pixels[y][x] = accent + (255,)

    # title line and dashboard bars
    for y in range(260, 301):
        for x in range(150, 1050):
            pixels[y][x] = accent + (255,)
    for y in range(330, 371):
        for x in range(150, 930):
            pixels[y][x] = (255, 255, 255, 80)
    for y in range(390, 431):
        for x in range(150, 820):
            pixels[y][x] = (255, 255, 255, 70)
    for y in range(460, 501):
        for x in range(150, 915):
            pixels[y][x] = (255, 255, 255, 60)

    # KPI cards
    card_colors = [(15, 118, 110), (29, 78, 216), (124, 58, 237)]
    for idx, (x, y, w, h, color) in enumerate([
        (150, 530, 230, 120, card_colors[0]),
        (430, 530, 220, 120, card_colors[1]),
        (700, 530, 220, 120, card_colors[2]),
    ]):
        for yy in range(y, y + h):
            for xx in range(x, x + w):
                pixels[yy][xx] = color + (255,)

    # Simple metric blocks inside cards
    for x, y in [(190, 560), (470, 560), (760, 560)]:
        for yy in range(y, y + 50):
            for xx in range(x, x + 120):
                pixels[yy][xx] = (255, 255, 255, 90)

    # Add title text as big simple blocks using crude bitmap letters (approximate glyphs)
    def put_text(tx, ty, word, color, scale=1):
        for index, ch in enumerate(word):
            x0 = tx + index * 18 * scale
            for row_idx, row in enumerate([
                '01110','10001','10001','11111','10001','10001','01110' if ch == 'A' else '00000',
                '11110','10001','11110','10001','10001','11110','00000',
                '01110','10001','10000','10000','10001','01110','00000',
                '11110','10001','10001','10001','10001','11110','00000',
                '10000','10000','10000','10111','10001','10001','11110',
                '11110','10000','10000','11110','10001','10001','11110',
                '10001','10001','10001','11110','10001','10001','11110',
                '11111','10000','10000','10000','10000','10000','11111',
                '10001','10001','10001','10001','10001','10001','11110',
                '11110','10001','10001','11110','10000','10000','11110',
            ]):
                pass

    # Instead of complicated text, use a simple banner fill
    for y in range(90, 120):
        for x in range(170, 1020):
            pixels[y][x] = text + (255,)

    # Set an approximate title via 6x7 block letters for a few characters
    def draw_char(cx, cy, ch, color):
        font = {
            'E': ['11110','10000','11110','10000','10000','10000','11110'],
            'x': ['10001','01010','00100','01010','10001','00000','00000'],
            'c': ['01110','10001','10000','10000','10001','01110','00000'],
            'u': ['10001','10001','10001','10001','10001','01010','00100'],
            't': ['00100','00100','11110','00100','00100','00100','00000'],
            'i': ['00100','00000','00100','00100','00100','00100','00000'],
            'v': ['10001','10001','10001','01010','01010','00100','00000'],
            'O': ['01110','10001','10001','10001','10001','10001','01110'],
            'P': ['11110','10001','10001','11110','10000','10000','10000'],
            'R': ['11110','10001','10001','11110','01000','00100','00010'],
            'A': ['01110','10001','10001','11111','10001','10001','10001'],
            'N': ['10001','11011','10111','10011','10001','10001','10001'],
            'a': ['00000','01110','00001','01111','10001','01111','00000'],
            'l': ['00000','00100','00100','00100','00100','00100','00000'],
            's': ['00000','01110','10000','01110','00001','01110','00000'],
            'y': ['10001','10001','01111','00001','01110','00000','00000'],
            'S': ['01110','10001','10000','01110','00001','10001','01110'],
            '1': ['00100','01100','00100','00100','00100','00100','01110'],
            '2': ['01110','10001','00001','00010','00100','01000','11111'],
            '3': ['11110','00001','00010','00100','00001','10001','01110'],
            '4': ['00010','00110','01010','10010','11111','00010','00010'],
            '5': ['11111','10000','11110','00001','00001','10001','01110'],
            '6': ['01110','10000','10000','11110','10001','10001','01110'],
            '7': ['11111','00001','00010','00100','01000','01000','01000'],
            '8': ['01110','10001','10001','01110','10001','10001','01110'],
            '9': ['01110','10001','10001','01111','00001','00010','11100'],
            '0': ['01110','10001','10001','10001','10001','10001','01110'],
            '-': ['00000','00000','00000','11111','00000','00000','00000'],
            ' ': ['00000','00000','00000','00000','00000','00000','00000'],
        }
        pixels_map = font.get(ch, font[' '])
        for row_idx, row in enumerate(pixels_map):
            for col_idx, bit in enumerate(row):
                if bit == '1':
                    for dy in range(0, 4):
                        for dx in range(0, 4):
                            px = cx + col_idx * 4 + dx
                            py = cy + row_idx * 4 + dy
                            if 0 <= px < width and 0 <= py < height:
                                pixels[py][px] = color + (255,)

    title_short = title.upper()
    title_x = 170
    title_y = 96
    for char in title_short:
        if char == ' ':
            title_x += 24
        else:
            draw_char(title_x, title_y, char, text)
            title_x += 28

    # make sure the file is saved
    file_path = base / filename
    file_path.write_bytes(png_from_pixels(width, height, pixels))
    print(f'created {file_path}')
