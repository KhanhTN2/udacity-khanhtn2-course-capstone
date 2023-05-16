import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../fileStogare/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todosAccess = new TodosAccess()

//Write getTodosForUser business logic
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info('Getting all todos')
    return await todosAccess.getAllTodos(userId)
}

// Write createTodo business logic  
export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const newItem = {
        userId,
        todoId,
        createdAt,
        done: false,
        ...newTodo
    }
    logger.info('Creating new todo item', newItem)
    return await todosAccess.createTodoItem(newItem)
}

//write updateTodo business logic
export async function updateTodo(
    todoId: string,
    todoUpdate: UpdateTodoRequest,    
    userId: string
): Promise<TodoUpdate> {
    logger.info('Updating todo item', todoUpdate)
    return await todosAccess.updateTodoItem(todoUpdate, todoId, userId)
}

//write deleteTodo business logic
export async function deleteTodo(
    todoId: string,
    userId: string
): Promise<string> {
    logger.info('Deleting todo item', todoId)
    //delete attachment from S3
    await attachmentUtils.deleteAttachment(todoId)
    return todosAccess.deleteTodoItem(todoId, userId)
}

//write attachment business logic
export async function createAttachmentPresignedUrl(
    todoId: string,
    userId: string
): Promise<string> {
    logger.info('Generating upload url for todo item by userId',userId, todoId)
    const uploadUrl = await attachmentUtils.getUploadUrl(todoId)
    logger.info('Generated upload url for todo item', uploadUrl)
    return uploadUrl
}

//Update attachmentUrl business logic
export async function updateAttachmentUrl(
    userId: string,
    todoId: string
): Promise<void> {
    const attachmentUrl = await attachmentUtils.getAttachmentUrl(todoId);
    logger.info('Updating attachment url for todo item by userId', userId, todoId, attachmentUrl)
    return todosAccess.updateTodoAttachmentUrl(todoId, userId, attachmentUrl)
}

//delete attachment business logic
export async function deleteTodoAttachment(
    todoId: string,
    userId: string
): Promise<void> {
    logger.info('Deleting attachment for todo item', todoId)
    //delete attachment from S3
    await attachmentUtils.deleteAttachment(todoId)
    return todosAccess.deleteTodoAttachmentUrl(todoId, userId)
}