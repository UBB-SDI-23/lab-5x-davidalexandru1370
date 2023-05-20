using mpp1.Model;

namespace mpp1.SignalR;

public interface IMessageHub
{
    public Task SendMessageToEveryone(Message message);
}