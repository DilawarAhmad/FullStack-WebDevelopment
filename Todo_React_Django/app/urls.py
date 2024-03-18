from django.urls import path
from . import views

urlpatterns = [
    path("",views.task_list,name="task_list"),
    path("task-create",views.add_task,name="task-create"),
    path("task-detail/<str:pk>/",views.detail_task,name="detail_task"),
    path("task-update/<str:pk>/",views.update_task,name="update_task"),
    path("task-delete/<str:pk>/",views.delete_task,name="delete_task")
]
