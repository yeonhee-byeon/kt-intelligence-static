# python find_unused_images.py 사용하지 않는 이미지 삭제

import os
import re

IMAGE_DIRS = [
    'resource/images',
    'resource/images/ai/icons'
]
CODE_ROOT = '.'
IMAGE_EXTS = ('.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp')
CODE_EXTS = ('.html', '.htm', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md')

def find_all_images():
    image_files = []
    for img_dir in IMAGE_DIRS:
        for root, _, files in os.walk(img_dir):
            for file in files:
                if file.lower().endswith(IMAGE_EXTS):
                    image_files.append(os.path.join(root, file))
    return image_files

def find_all_code_files():
    code_files = []
    for root, _, files in os.walk(CODE_ROOT):
        for file in files:
            if file.lower().endswith(CODE_EXTS):
                code_files.append(os.path.join(root, file))
    return code_files

def is_image_used(image_filename, code_files):
    pattern = re.escape(os.path.basename(image_filename))
    for code_file in code_files:
        try:
            with open(code_file, 'r', encoding='utf-8', errors='ignore') as f:
                if re.search(pattern, f.read()):
                    return True
        except Exception:
            pass
    return False

def main():
    print("이미지 파일 목록을 수집 중...")
    image_files = find_all_images()
    print(f"총 {len(image_files)}개의 이미지 파일을 찾았습니다.")

    print("코드 파일 목록을 수집 중...")
    code_files = find_all_code_files()
    print(f"총 {len(code_files)}개의 코드 파일을 찾았습니다.")

    unused_images = []
    print("이미지 사용 여부를 검사 중...")
    for img in image_files:
        if not is_image_used(img, code_files):
            unused_images.append(img)

    print("\n=== 사용되지 않는 이미지 목록 ===")
    if unused_images:
        for img in unused_images:
            print(img)
        answer = input(f"\n위 {len(unused_images)}개의 파일을 정말 삭제하시겠습니까? (y/N): ")
        if answer.lower() == 'y':
            for img in unused_images:
                try:
                    os.remove(img)
                    print(f"삭제됨: {img}")
                except Exception as e:
                    print(f"삭제 실패: {img} ({e})")
            print("삭제 완료.")
        else:
            print("삭제를 취소했습니다.")
    else:
        print("모든 이미지가 코드에서 사용되고 있습니다.")

if __name__ == "__main__":
    main()