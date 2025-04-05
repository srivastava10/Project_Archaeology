import streamlit as st
st.set_page_config(page_title="Analyze Archaeological Structures", page_icon="icon.png", layout="centered", initial_sidebar_state="auto", menu_items=None)

from transformers import pipeline
import torch
from accelerate.test_utils.testing import get_backend
import requests
from PIL import Image
import numpy as np
import open3d as o3d

def reconstruct_3d(rgb_image, depth_image, intrinsic_matrix):

    
    rgb_o3d = o3d.geometry.Image(rgb_image)
    depth_o3d = o3d.geometry.Image(depth_image)

   
    rgbd_o3d = o3d.geometry.RGBDImage.create_from_color_and_depth(
        rgb_o3d, depth_o3d, depth_scale=1.0, depth_trunc=1000.0, convert_rgb_to_intensity=False
    )

    
    pinhole_camera_intrinsic = o3d.camera.PinholeCameraIntrinsic(
        width=rgb_image.shape[1], height=rgb_image.shape[0], fx=intrinsic_matrix[0, 0], fy=intrinsic_matrix[1, 1], cx=intrinsic_matrix[0, 2], cy=intrinsic_matrix[1, 2]
    )

    
    point_cloud = o3d.geometry.PointCloud.create_from_rgbd_image(
        rgbd_o3d, pinhole_camera_intrinsic
    )

   
    point_cloud.transform([[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]])

    return point_cloud
    

def visualize_point_cloud(point_cloud):
    o3d.visualization.draw_geometries([point_cloud])
    
device, _, _ = get_backend()
checkpoint = "depth-anything/Depth-Anything-V2-base-hf"
pipe = pipeline("depth-estimation", model=checkpoint, device=device)

st.title('Analyze Artefacts And Historical Structures: ')
st.write("Enjoy Archaeology !!")
img = st.file_uploader("Open Image", type=None, accept_multiple_files=False, key=None, help=None, on_change=None, args=None, kwargs=None, disabled=False, label_visibility="visible")
if img is not None:
    st.image(img)
    c=st.container()
    c.write("Image Analysis:-")
    c.write("Class: Structure")
    c.write("Material Composition: Khondalite, Laterite, Chlorolite")
    c.write("Period: 1250 CE")
    c.write("Location: Konark, Odisha, India")
    c.write("Description: The given image is a structure very similar to the Konark Sun Temple, Odisha, India. The temple is a UNESCO World Heritage Site and is a masterpiece of Indian architecture.")
    

    img = Image.open(img)
    prediction = pipe(img)
    output = prediction['depth']
    
    rgb_image = img
    depth_image = output
    rgb_image = np.array(rgb_image)
    depth_image = np.array(depth_image)
    intrinsic_matrix = np.array([[525.0, 0.0, 319.5], [0.0, 525.0, 239.5], [0.0, 0.0, 1.0]])
    
    point_cloud = reconstruct_3d(rgb_image, depth_image, intrinsic_matrix)
    flag = st.button("Visualize Point Cloud")
    if flag:
        st.write('Perceived Depth Map : ')
        st.image(output)
        visualize_point_cloud(point_cloud)
        flag = st.button("Reset")

    
        
    